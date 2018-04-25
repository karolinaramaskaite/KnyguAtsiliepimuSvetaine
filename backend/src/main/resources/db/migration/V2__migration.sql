CREATE TABLE "review"
(
   id         SERIAL PRIMARY KEY,
   user_id    INT REFERENCES "user"(id),
   review     TEXT,
   "date"     DATE
);