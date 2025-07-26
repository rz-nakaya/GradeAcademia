-- 管理者テーブル
CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 学生テーブル
CREATE TABLE IF NOT EXISTS student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 科目テーブル
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS nursery_education_theory_2 (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id),
    total_score INT CHECK (total_score >= 0 AND total_score <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS educational_system_management (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES student(id),
    total_score INT CHECK (total_score >= 0 AND total_score <= 100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
