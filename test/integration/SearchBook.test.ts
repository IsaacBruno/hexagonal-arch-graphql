import SearchBooks from "../../src/application/SearchBooks";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase";
import Connection from "../../src/infra/repository/database/Connection";

test("Deve buscar os livros", async function () {
  const connection = new Connection();
  const bookRepository = new BookRepositoryDatabase(connection);
  const searchBooks = new SearchBooks(bookRepository);
  const [book] = await searchBooks.execute("Clean Code");
  expect(book.title).toBe("Clean Code");
  await connection.close();
});
