CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(24) NOT NULL,
    username VARCHAR(8) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

INSERT INTO quizzer.users(user_id, username, email, password) VALUES ("5f443bb182f7d3e4dcbab536", "tester", "test@test.de", "password");