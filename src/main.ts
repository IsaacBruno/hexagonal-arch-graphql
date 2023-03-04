import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import pqp from "pg-promise";
import crypto from "crypto";

async function main() {
  const connection = pqp()(
    "postgres://postgres:secret@localhost:5432/hexagonal_graphql"
  );
  const typeDefs = `
        type Book {
            id: String
            title: String
            price: Int
            authors: [Author]
        }

        type Author {
          id: String
          name: String
        }

        type Query {
            books (criteria: String): [Book]
        }

        input BookInput {
            title: String
            price: Int
            authorName: String
        }

        type Mutation {
            saveBook (book: BookInput): Book
        }
    `;

  const resolvers = {
    Query: {
      async books(_: any, args: any) {
        const booksData = await connection.query(
          "select * from book where ($1::text is null or title = $1)",
          [args.criteria]
        );
        const books = [];
        for (const bookData of booksData) {
          const authorsData = await connection.query(
            "select * from book_author join author using (id_author) where id_book = $1",
            [bookData.id_book]
          );
          const authors = [];
          for (const authorData of authorsData) {
            authors.push({
              id: authorData.id_author,
              name: authorData.name,
            });
          }
          books.push({
            id: bookData.id_book,
            title: bookData.title,
            price: parseFloat(bookData.price),
            authors,
          });
        }
        return books;
      },
    },
    Mutation: {
      async saveBook(_: any, args: any) {
        const idBook = crypto.randomUUID();
        const idAuthor = crypto.randomUUID();
        await connection.query(
          "insert into book (id_book, title, price) values ($1, $2, $3)",
          [idBook, args.book.title, args.book.price]
        );
        await connection.query(
          "insert into author (id_author, name) values ($1, $2)",
          [idAuthor, args.book.authorName]
        );
        await connection.query(
          "insert into book_author (id_book, id_author) values ($1, $2)",
          [idBook, idAuthor]
        );

        const [bookData] = await connection.query(
          "select * from book where id_book = $1",
          [idBook]
        );
        const authorsData = await connection.query(
          "select * from book_author join author using (id_author) where id_book = $1",
          [bookData.id_book]
        );
        const authors = [];
        for (const authorData of authorsData) {
          authors.push({
            id: authorData.id_author,
            name: authorData.name,
          });
        }
        return {
          id: bookData.id_book,
          title: bookData.title,
          price: parseFloat(bookData.price),
          authors,
        };
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
}

main();
