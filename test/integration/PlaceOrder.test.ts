import PlaceOrder from "../../src/application/PlaceOrder";
import BookRepositoryDatabase from "../../src/infra/repository/BookRepositoryDatabase";
import Connection from "../../src/infra/repository/database/Connection";
import OrderRepositoryDatabase from "../../src/infra/repository/OrderRepositoryDatabase";

test("Deve criar um pedido de compra para o livro", async function () {
  const connection = new Connection();
  const orderRepository = new OrderRepositoryDatabase(connection);
  const bookRepository = new BookRepositoryDatabase(connection);
  const placeOrder = new PlaceOrder(orderRepository, bookRepository);
  const input = {
    email: "mark@email.com",
    books: [
      "18c0eb16-de43-45f8-b4e6-7b05eb3ce76f",
      "00513207-f11d-4296-a9f2-2fc631e305d5",
    ],
  };
  const output = await placeOrder.execute(input);
  expect(output.amount).toBe(59 + 79);
  await connection.close();
});
