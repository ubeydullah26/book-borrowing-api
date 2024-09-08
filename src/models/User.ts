import { db } from "../database/connection";

export interface User {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface BookBorrow {
  name: string;
  userScore?: number;
}

interface UserWithBooks {
  id: number;
  name: string;
  books: {
    past: BookBorrow[];
    present: BookBorrow[];
  };
}

class UserModel {
  private table: string = "users";

  async getAll(): Promise<User[]> {
    return await db(this.table).select("id", "name").orderBy("name");
  }

  async getById(id: number): Promise<User | undefined> {
    return await db(this.table).where({ id }).first();
  }

  async create(user: Omit<User, "id">): Promise<number> {
    const [result] = await db(this.table).insert(user).returning("id");
    return result.id;
  }

  async getUserWithBooks(id: number): Promise<UserWithBooks | null> {
    const user = await this.getById(id);
    if (!user) return null;

    const books = await db("borrows")
      .join("books", "borrows.book_id", "books.id")
      .where("user_id", id)
      .select(
        "books.name",
        "borrows.score",
        "borrows.is_returned",
        "borrows.id as borrowId"
      )
      .orderBy("borrowId", "desc");

    const pastBooks = books
      .filter((b) => b.is_returned)
      .map((b) => ({ name: b.name, userScore: b.score }));

    const presentBooks = books
      .filter((b) => !b.is_returned)
      .map((b) => ({ name: b.name }));

    return {
      id: user.id!,
      name: user.name,
      books: {
        past: pastBooks,
        present: presentBooks,
      },
    };
  }

  async borrowBook(userId: number, bookId: number): Promise<boolean> {
    const isBookBorrowed = await db("borrows")
      .where({ book_id: bookId, is_returned: false })
      .first();

    if (isBookBorrowed) {
      return false;
    }

    await db("borrows").insert({
      user_id: userId,
      book_id: bookId,
      is_returned: false,
    });

    return true;
  }

  async returnBook(
    userId: number,
    bookId: number,
    score: number
  ): Promise<boolean> {
    const borrowedBook = await db("borrows")
      .where({
        user_id: userId,
        book_id: bookId,
        is_returned: false,
      })
      .first();

    if (!borrowedBook) {
      return false;
    }

    await db("borrows").where({ id: borrowedBook.id }).update({
      is_returned: true,
      score: score,
    });

    return true;
  }
}

export default new UserModel();
