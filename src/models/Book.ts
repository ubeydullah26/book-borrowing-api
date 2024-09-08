import { db } from "../database/connection";

export interface Book {
  id?: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface BookWithScore {
  id: number;
  name: string;
  score: string | number;
}

class BookModel {
  private table: string = "books";

  async getAll(): Promise<Book[]> {
    return await db(this.table).select("id", "name").orderBy("name");
  }

  async getById(id: number): Promise<Book | undefined> {
    return await db(this.table).where({ id }).first();
  }

  async create(book: Omit<Book, "id">): Promise<number> {
    const [result] = await db(this.table).insert(book).returning("id");
    return result.id;
  }

  async getBookWithScore(id: number): Promise<BookWithScore | null> {
    const result = await db(this.table)
      .select(
        "books.id",
        "books.name",
        db.raw("COALESCE(ROUND(AVG(borrows.score)::numeric, 2)) as score")
      )
      .leftJoin("borrows", function () {
        this.on("books.id", "=", "borrows.book_id").andOn(
          "borrows.is_returned",
          "=",
          db.raw("?", [true])
        );
      })
      .where("books.id", id)
      .groupBy("books.id", "books.name")
      .first();

    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      score: result.score ? result.score : -1,
    };
  }
}

export default new BookModel();
