use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};

use crate::{model::participant::ParticipantPreview, SharedState};

pub async fn get_participants(State(state): State<SharedState>) -> impl IntoResponse {
    match ParticipantPreview::get_participants(&state.db).await {
        Ok(participants) => (StatusCode::OK, Json(participants)).into_response(),
        Err(e) => {
            tracing::error!("Failed to get participants: {}", e);
            (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()).into_response()
        }
    }
}
