import BookService from '../services/BookService';
import Util from '../utils/Utils';

const util = new Util();

class BookController {
  static async getAllBooks(req, res) {
    try {
      /* Pagination */
      var page = req.query.page;
      if (!page) {
        page = 1;
      }else {
        page = parseInt(page);
      }
      var perPage = req.query.perPage;
      if (!perPage) {
        perPage = 5;
      }else {
        perPage = parseInt(perPage);
      }

      var currentUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

      const allBooks = await BookService.getAllBooks(page,perPage,currentUrl);
      /* End Pagination */

      // if (allBooks.length > 0) {
      if (allBooks.total > 0) {
        util.setSuccess(200, 'Data retrieved', allBooks);
      } else {
        util.setSuccess(200, 'No data found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addBook(req, res) {
    if (!req.body.title || !req.body.price || !req.body.description) {
      util.setError(400, 'Please provide complete details');
      return util.send(res);
    }
    const newBook = req.body;
    try {
      const createdBook = await BookService.addBook(newBook);
      util.setSuccess(201, 'Data Added!', createdBook);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatedBook(req, res) {
    const alteredBook = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const updateBook = await BookService.updateBook(id, alteredBook);
      if (!updateBook) {
        util.setError(404, `Cannot find data with the id: ${id}`);
      } else {
        util.setSuccess(200, 'Data updated', updateBook);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getABook(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const theBook = await BookService.getABook(id);

      if (!theBook) {
        util.setError(404, `Cannot find data with the id ${id}`);
      } else {
        util.setSuccess(200, 'Data Book', theBook);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteBook(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const bookToDelete = await BookService.deleteBook(id);

      if (bookToDelete) {
        util.setSuccess(200, 'Data deleted');
      } else {
        util.setError(404, `Data with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default BookController;
