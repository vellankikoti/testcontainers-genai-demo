CREATE TABLE IF NOT EXISTS ChatHistory (
    id SERIAL PRIMARY KEY,
    user_message TEXT NOT NULL,
    ai_responses JSON NOT NULL
);
