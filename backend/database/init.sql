CREATE TABLE ChatHistory (
    id SERIAL PRIMARY KEY,
    user_message TEXT NOT NULL,
    ai_responses JSON NOT NULL
);
