CREATE DATABASE artify;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    mail VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_login TIMESTAMP NOT NULL,
    last_login TIMESTAMP DEFAULT NOW(),
    profile_picture LONGBLOB,
    description TEXT,
    n_follower INT DEFAULT 0,
    n_following INT DEFAULT 0,
    n_post INT DEFAULT 0
);

DROP TABLE IF EXISTS Follows;

CREATE TABLE Follows (
    id1 INT,
    id2 INT,
    FOREIGN KEY (id1) REFERENCES Users(id),
    FOREIGN KEY (id2) REFERENCES Users(id),
	PRIMARY KEY (id1, id2)
);

DROP TABLE IF EXISTS Posts;

CREATE TABLE Posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    image VARCHAR(255),
    description TEXT,
    tp TIMESTAMP
);

DROP TABLE IF EXISTS Comments;

CREATE TABLE Comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES Posts(id),
    content TEXT,
    tp TIMESTAMP, 
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

DROP TABLE IF EXISTS CommentAComment;

CREATE TABLE CommentAComment (
    comment1_id INT,
    comment2_id INT,
    PRIMARY KEY (comment1_id, comment2_id),
    FOREIGN KEY (comment1_id) REFERENCES Comments(id),
    FOREIGN KEY (comment2_id) REFERENCES Comments(id)
);

DROP TABLE IF EXISTS Messages;

CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sender_id INT,
    receiver_id INT,
    FOREIGN KEY (sender_id) REFERENCES Users(id),
    FOREIGN KEY (receiver_id) REFERENCES Users(id),
    content TEXT,
    tp TIMESTAMP
);

DROP TABLE IF EXISTS Quotes;

CREATE TABLE Quotes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    quote_day DATETIME
);


