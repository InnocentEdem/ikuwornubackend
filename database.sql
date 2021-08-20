CREATE DATABASE quiz;

-- CREATE TABLE users(
--   user_id SERIAL PRIMARY KEY,
--   user_name VARCHAR(255) NOT NULL,
--   user_email VARCHAR(255) NOT NULL UNIQUE,
--   user_password VARCHAR(255) NOT NULL,
--   roles VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE file(
--   file_id SERIAL PRIMARY KEY,
--   user_id int,
--   description VARCHAR(255) NOT NULL,
--   title VARCHAR(255) NOT NULL,
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );
create table quizmasters(
    id serial primary key,
    fname varchar(100) not null,
    lname varchar(100) not null,
    user_password varchar(100)not null,
    isAdmin boolean,
    username varchar(15) not null,
    UNIQUE(username)
);

create table questions(
    id serial primary key,
    question varchar(500),
    answer varchar(200),
    quizmaster_id int references quizmasters(id)

);

create table quiz_sessions(
    session_id serial primary key,
    date_created date,
    quizmaster_id int references quizmasters(id)
);
create table contestants(
    id serial primary key,
    fname varchar(100),
    lname varchar(100),
    quiz_session_id int references quiz_sessions(session_id)
);

--admin user
INSERT INTO quizmasters (fname, lname, user_password isAdmin) VALUES ('Innocent', 'Edem', 'shineyoureyes', true);
 