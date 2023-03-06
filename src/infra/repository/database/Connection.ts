import pgp from "pg-promise";

export default class Connection {
  connection: any;

  constructor() {
    this.connection = pgp()(
      "postgres://postgres:secret@localhost:5432/hexagonal_graphql"
    );
  }

  query(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  close() {
    return this.connection.$pool.end();
  }
}
