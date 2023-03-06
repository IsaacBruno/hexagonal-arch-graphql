import SaveBook from "../../src/application/SaveBook";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase";
import Connection from "../../src/infra/repository/database/Connection";

test("Deve salvar um livro", async function () {
  const connection = new Connection();
  const bookRepository = new BookRepositoryDatabase(connection);
  const saveBook = new SaveBook(bookRepository);
  const input = {
    title: "A",
    price: 1000,
    authorName: "B",
  };
  const output = await saveBook.execute(input);
  expect(output.title).toBe("A");
  expect(output.price).toBe(1000);
  expect(output.authors[0].name).toBe("B");
  await connection.close();
});
