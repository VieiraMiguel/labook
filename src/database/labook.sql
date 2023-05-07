-- Active: 1683423095092@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        'u001',
        'Miguel',
        'miguel_vieira@email.com',
        'miguelpass123',
        'ADMIN'
    ), (
        'u002',
        'Link',
        'hero_of_time@sheikahmail.com',
        'linkpass123',
        'NORMAL'
    ), (
        'u003',
        'Zelda',
        'hyrule_princess@hyliamail.com',
        'zeldapass123',
        'NORMAL'
    ), (
        'u004',
        'Solid Snake',
        'fox.hound_best@otacon.com',
        'snakepass123',
        'NORMAL'
    ), (
        'u005',
        'Big Boss',
        'legendary_soldier@outterheaven.com',
        'davidpass123',
        'NORMAL'
    ), (
        'u006',
        'Samus Aran',
        'galactic_bounty.hunter@federationmail.com',
        'metroidpass123',
        'NORMAL'
    );

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT UNIQUE NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    posts(
        id,
        creator_id,
        content,
        likes,
        dislikes
    )
VALUES (
        'p001',
        'u001',
        'Labook is ON!',
        5,
        0
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    likes_dislikes(user_id, post_id, like)
VALUES ('u002', 'p001', 1), ('u003', 'p001', 1), ('u004', 'p001', 1), ('u005', 'p001', 1), ('u006', 'p001', 1);

SELECT * FROM posts;

SELECT * FROM users;


DROP TABLE likes_dislikes;
DROP TABLE users;
DROP TABLE posts;