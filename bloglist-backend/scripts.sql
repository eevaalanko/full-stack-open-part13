CREATE TABLE blogs
(
    id     SERIAL PRIMARY KEY,
    author text,
    url    text NOT NULL,
    title  text NOT NULL,
    likes  integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Martha Stewart', 'mscooking.com', 'Cooking and Crimes');
insert into blogs (author, url, title) values ('Charles Baudelaire', 'fleurs.fr', 'Les Fleurs du Mal et Divas');