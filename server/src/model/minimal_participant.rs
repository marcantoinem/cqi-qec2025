use argon2::{password_hash::SaltString, Argon2, PasswordHasher};
use rand::{
    distributions::{Alphanumeric, DistString},
    rngs::OsRng,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use ts_rs::TS;
use uuid::Uuid;

use super::{competition::Competition, role::Role};

#[derive(Debug, Serialize, Deserialize, TS, sqlx::FromRow)]
#[ts(export)]
pub struct MinimalParticipant {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub competition: Competition,
    pub role: Role,
}

impl MinimalParticipant {
    pub async fn get_participants(db: &PgPool) -> Result<Vec<Self>, sqlx::Error> {
        sqlx::query_as("SELECT * FROM participants")
            .fetch_all(db)
            .await
    }

    pub async fn write_to_database(&self, db: &PgPool) -> Result<(), sqlx::Error> {
        let id = Uuid::new_v4();
        let password = Alphanumeric.sample_string(&mut rand::thread_rng(), 16);
        tracing::info!("Generated password: {}", password); // TODO: remove this debug line
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();
        let password_hash = argon2
            .hash_password(password.as_bytes(), &salt)
            .unwrap()
            .to_string();
        sqlx::query!(
            r#"INSERT INTO participants (id, role, email, password_hash, first_name, last_name, competition, university_name)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"#,
            id,
            self.role as Role,
            self.email,
            password_hash,
            self.first_name,
            self.last_name,
            self.competition as Competition,
            "test"
        )
        .execute(db)
        .await?;
        Ok(())
    }
}