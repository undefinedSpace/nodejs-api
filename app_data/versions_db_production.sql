DROP TABLE IF EXISTS servers CASCADE;
CREATE TABLE servers (
    id       SERIAL PRIMARY KEY,
    ip       VARCHAR(20) NOT NULL,
    hostname VARCHAR(20) NOT NULL,
    token    VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS projects CASCADE;
CREATE TABLE projects (
    id         SERIAL PRIMARY KEY,
    server_id  INTEGER,
    path       VARCHAR(200) NOT NULL,
    time_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_stop  TIMESTAMP
);

DROP TABLE IF EXISTS folders CASCADE;
CREATE TABLE folders (
    id         SERIAL PRIMARY KEY,
    server_id  INTEGER,
    parent_id  INTEGER NULL,
    name       VARCHAR(200) NOT NULL,
    inode      BIGINT,
    deleted    BOOLEAN NOT NULL DEFAULT FALSE
    FOREIGN KEY (server_id, parent_id) REFERENCES rentable_movies(movie_id, store_id, copy_number)
);

DROP TABLE IF EXISTS files CASCADE;
CREATE TABLE files (
    id         SERIAL PRIMARY KEY,
    server_id  INTEGER,
    folder_id  INTEGER,
    name       VARCHAR(200) NOT NULL,
    hash       BIGINT,
    inode      BIGINT,
    deleted    BOOLEAN NOT NULL DEFAULT FALSE
);