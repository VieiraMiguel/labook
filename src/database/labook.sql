-- Active: 1682700789865@@127.0.0.1@5432

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
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
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        'u001',
        'Miguel',
        'miguel_vieira@email.com',
        'miguelpass123',
        'admin'
    ), (
        'u002',
        'Link',
        'hero_of_time@sheikahmail.com',
        'linkpass123',
        'user'
    ), (
        'u003',
        'Zelda',
        'hyrule_princess@hyliamail.com',
        'zeldapass123',
        'user'
    ), (
        'u004',
        'Solid Snake',
        'fox.hound_best@otacon.com',
        'snakepass123',
        'user'
    ), (
        'u005',
        'Big Boss',
        'legendary_soldier@outterheaven.com',
        'davidpass123',
        'user'
    ), (
        'u006',
        'Samus Aran',
        'galactic_bounty.hunter@federationmail.com',
        'metroidpass123',
        'user'
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

INSERT INTO
    likes_dislikes(user_id, post_id, like)
VALUES ('u002', 'p001', 1), ('u003', 'p001', 1), ('u004', 'p001', 1), ('u005', 'p001', 1), ('u006', 'p001', 1);