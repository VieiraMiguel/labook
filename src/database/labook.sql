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
        'admin',
        'admin@email.com',
        '$2a$12$DJuloF8t8aV4rQ0.w9fjK.tccdxAP1U0O558WMvlwC5KGaP4F7ABG',--adminpass123
        'ADMIN'
    ), (
        'u002',
        'Link',
        'hero_of_time@sheikahmail.com',
        '$2a$12$bdGa7r6SOY36k43MuyMk/unvM/rAdEJu23bxw4pUvupSE1IURNE3u',--linkpass123
        'NORMAL'
    ), (
        'u003',
        'Zelda',
        'hyrule_princess@hyliamail.com',
        '$2a$12$WKLuNxV3WAdn7XAVxpuv2utZSfp8tM0b16GLCTt0UXN///x.0LkZi',--zeldapass123
        'NORMAL'
    ), (
        'u004',
        'Solid Snake',
        'fox.hound_best@otacon.com',
        '$2a$12$1vDgZn1bK74ybKjRkwJEHu.h36SkxR7Y.i2Q/FzFU9K77PQ2xmgLS',--snakepass123
        'NORMAL'
    ), (
        'u005',
        'Big Boss',
        'legendary_soldier@outterheaven.com',
        '$2a$12$IU4JcbaE3N9Vh1Jce9rgSOYOxBoAYe93sgKsc1ahmrXtqXLzR6fHO',--davidpass123
        'NORMAL'
    ), (
        'u006',
        'Samus Aran',
        'galactic_bounty.hunter@federationmail.com',
        '$2a$12$n0Bkb/Wl3sSUEhFuBQkhfeqjEBxbTInDohBD8xQyajKRwXW/svKGK',--metroidpass123
        'NORMAL'
    );

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
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
    ), (
        'p002',
        'u003',
        'Watching over my hero...',
        0,
        0
    ), (
        'p003',
        'u002',
        'Slaying Ganon monsters!',
        0,
        0
    ), (
        'p004',
        'u006',
        'Space pirates...They never stop.',
        0,
        0
    ), (
        'p005',
        'u005',
        'Just another day in Outer Heaven...',
        0,
        0
    ), (
        'p006',
        'u004',
        'I have to stop the Outer Heaven army!',
        0,
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