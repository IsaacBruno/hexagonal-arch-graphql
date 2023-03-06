import BookRepository from "../domain/repository/BookRepository";

export default class SearchBooks {
  constructor(readonly bookRepository: BookRepository) {}

  async execute(criteria: string): Promise<Output[]> {
    return await this.bookRepository.search(criteria);
  }
}

type Output = {
  id: string;
  title: string;
  price: number;
  authors: { id: string; name: string }[];
};
