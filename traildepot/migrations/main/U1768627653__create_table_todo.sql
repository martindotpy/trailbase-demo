CREATE TABLE "todo" (
    'id' BLOB PRIMARY KEY CHECK (is_uuid_v7(id)) DEFAULT (uuid_v7()) NOT NULL,
    'title' TEXT NOT NULL,
    'content' TEXT NOT NULL,
    'status' INTEGER NOT NULL
) STRICT;
