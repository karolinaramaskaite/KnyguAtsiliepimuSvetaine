alter table "review"
add column "book_id" INT REFERENCES "book"(id)