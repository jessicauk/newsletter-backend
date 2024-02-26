CREATE TABLE "recipient" (
    "userId" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "unsubscribeToken" VARCHAR,
    "isSubscribed" BOOLEAN DEFAULT TRUE,
    "tokenExpiration" TIMESTAMP
);

SELECT * FROM recipient;

CREATE OR REPLACE FUNCTION set_token_expiration()
RETURNS TRIGGER AS $$
BEGIN
    NEW."tokenExpiration" := CURRENT_TIMESTAMP + INTERVAL '24 hours';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_recipients
BEFORE INSERT ON recipient 
FOR EACH ROW
EXECUTE FUNCTION set_token_expiration();

INSERT INTO recipient ("name", "email", "unsubscribeToken", "isSubscribed")
VALUES 
('Jessica', 'jessica.uk220691@gmail.com', 'uniqueToken1', TRUE), 
('Moonket', 'moonket.store@gmail.com', 'uniqueToken2', TRUE)