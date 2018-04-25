CREATE TABLE "book"
(
   id         SERIAL PRIMARY KEY,
   author_id    INT REFERENCES "author"(id),
   title     VARCHAR(255),
   "year"     VARCHAR(255),
   isbn     VARCHAR(255),
   about    TEXT,
   add_date     date
);