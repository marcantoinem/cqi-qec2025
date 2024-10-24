use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use ts_rs::TS;
use uuid::Uuid;

use super::{competition::Competition, role::Role, university::University};

#[derive(Debug, Serialize, Deserialize, TS, sqlx::FromRow)]
#[ts(export)]
pub struct ParticipantPreview {
    pub id: Uuid,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub role: Role,
    pub competition: Competition,
    pub university: University,
    pub contain_cv: bool,
}

impl ParticipantPreview {
    pub async fn get_participants(db: &PgPool) -> Result<Vec<Self>, sqlx::Error> {
        sqlx::query_as::<_, Self>(
            r#"SELECT id, first_name, last_name, email, role, competition, university, cv IS NOT NULL as contain_cv FROM participants"#
        )
        .fetch_all(db)
        .await
    }

    pub async fn get_participants_from_university(
        db: &PgPool,
        university: University,
    ) -> Result<Vec<Self>, sqlx::Error> {
        sqlx::query_as("SELECT id, first_name, last_name, email, role, competition, university, cv IS NOT NULL as contain_cv FROM participants WHERE university = $1 AND (role = 'participant' OR role = 'chef')")
            .bind(university)
            .fetch_all(db)
            .await
    }
}
