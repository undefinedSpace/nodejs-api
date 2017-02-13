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
    server_id  SERIAL REFERENCES servers(id),
    path       VARCHAR(200) NOT NULL,
    time_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    time_stop  TIMESTAMP
);

DROP TABLE IF EXISTS folders CASCADE;
CREATE TABLE folders (
    id         SERIAL PRIMARY KEY,
    server_id  INTEGER REFERENCES servers(id),
    parent_id  INTEGER NULL,
    CONSTRAINT (parent_id) REFERENCES folders(id)
    name       VARCHAR(200) NOT NULL,
    inode      BIGINT,
    deleted    BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS files CASCADE;
CREATE TABLE files (
    id         SERIAL PRIMARY KEY,
    server_id  SERIAL REFERENCES servers(id),
    folder_id  SERIAL REFERENCES folders(id),
    name       VARCHAR(200) NOT NULL,
    hash       BIGINT,
    inode      BIGINT,
    deleted    BOOLEAN NOT NULL DEFAULT FALSE
);