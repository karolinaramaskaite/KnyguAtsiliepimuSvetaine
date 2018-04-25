CREATE TABLE "user"
(
   id         SERIAL PRIMARY KEY,
   email    VARCHAR(255),
   name     VARCHAR(255),
   surname     VARCHAR(255),
   type VARCHAR(255)
);

alter table "user" add unique (email),
add column "password" varchar(255),
add column token varchar
