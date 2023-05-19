CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS client (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	PRIMARY KEY ( id )
);

CREATE TABLE IF NOT EXISTS favorite (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    url VARCHAR ( 255 ) NOT NULL,
    PRIMARY KEY ( id ),
    CONSTRAINT client
    FOREIGN KEY(user_id) 
    REFERENCES client(id)
);

INSERT INTO client (email, password)
VALUES('john@doe.com', '1234')
ON CONFLICT (email) 
DO NOTHING;