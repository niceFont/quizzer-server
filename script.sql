CREATE TABLE IF NOT EXISTS users(
    user_id VARCHAR(24) NOT NULL,
    username VARCHAR(8) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS quizzer.quizzes(
    quiz_id VARCHAR(12) NOT NULL, 
    name VARCHAR(32) NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(quiz_id)
);

CREATE TABLE quizzer.questions(
    quiz_id VARCHAR(12) NOT NULL,
    question_id VARCHAR(8) NOT NULL,
    question VARCHAR(255) NOT NULL,
    type ENUM('choice', 'input') NOT NULL,
    answer VARCHAR(255) NOT NULL,
    PRIMARY KEY(quiz_id, question_id),
    INDEX question_idx (question_id),
    FOREIGN KEY (quiz_id) REFERENCES quizzer.quizzes(quiz_id) ON DELETE CASCADE
);

CREATE TABLE quizzer.options(
    option_id VARCHAR(8) NOT NULL,
    option_value VARCHAR(255) NOT NULL,
    question_id VARCHAR(8) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY(option_id, question_id),
    FOREIGN KEY (question_id) REFERENCES quizzer.questions(question_id) ON DELETE CASCADE
)
