import database from '../src/models';

class BookService {
  static async getAllBooks(page,perPage,currentUrl) {
    try {
      // return await database.Book.findAll();

      /* Pagination */

      // Default page = 1 and paginate = 25
      // const { docs, pages, total } = await database.Book.paginate()
      // Or with extra options
      const options = {
        // attributes: ['id', 'name'],
        page: page,
        paginate: perPage,
        // order: [['name', 'DESC']],
        // where: { name: { [Op.like]: `%elliot%` } }
      }
      const { docs, pages, total } = await database.Book.paginate(options)
      var currentUrlPath = currentUrl.split("?").shift();
      var prevUrl = "#";
      if (page > 1 && (pages+1) >= page) {
        prevUrl = currentUrlPath+"?page="+(page-1);
      }

      var nextUrl = "#";
      if (page < pages && pages > 1) {
        nextUrl = currentUrlPath+"?page="+(page+1);
      }

      return  { docs, pages, total, page, currentUrl, prevUrl, nextUrl};
      /* End Pagination */

    } catch (error) {
      throw error;
    }
  }

  static async addBook(newBook) {
    try {
      return await database.Book.create(newBook);
    } catch (error) {
      throw error;
    }
  }

  static async updateBook(id, updateBook) {
    try {
      const bookToUpdate = await database.Book.findOne({
        where: { id: Number(id) }
      });

      if (bookToUpdate) {
        await database.Book.update(updateBook, { where: { id: Number(id) } });

        return updateBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getABook(id) {
    try {
      const theBook = await database.Book.findOne({
        where: { id: Number(id) }
      });

      return theBook;
    } catch (error) {
      throw error;
    }
  }

  static async deleteBook(id) {
    try {
      const bookToDelete = await database.Book.findOne({ where: { id: Number(id) } });

      if (bookToDelete) {
        const deletedBook = await database.Book.destroy({
          where: { id: Number(id) }
        });
        return deletedBook;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default BookService;
