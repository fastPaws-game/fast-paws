CREATE TABLE forums (
    id SERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL,
    topics INTEGER NOT NULL default 0
);

INSERT INTO forums (title) VALUES ('New Games'), ('Game designers'), ('Technologies');
