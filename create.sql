create database hexagonal_graphql;

\c hexagonal_graphql

create table book (
    id_book uuid,
    title text,
    price numeric
);

create table author (
    id_author uuid,
    name text
);

create table book_author (
    id_book uuid,
    id_author uuid
);

insert into book (id_book, title, price) values ('18c0eb16-de43-45f8-b4e6-7b05eb3ce76f', 'Clean Code', 59);
insert into author (id_author, name) values ('6d885bfc-d8dd-46b4-9fcf-35aaa93268df', 'Robert C. Martin');
insert into book_author (id_book, id_author) values ('18c0eb16-de43-45f8-b4e6-7b05eb3ce76f', '6d885bfc-d8dd-46b4-9fcf-35aaa93268df');

insert into book (id_book, title, price) values ('00513207-f11d-4296-a9f2-2fc631e305d5', 'Refactoring', 79);
insert into author (id_author, name) values ('267f85ac-1e08-4075-b2fe-572982abb1a4', 'Martin Fowler');
insert into book_author (id_book, id_author) values ('00513207-f11d-4296-a9f2-2fc631e305d5', '267f85ac-1e08-4075-b2fe-572982abb1a4');
