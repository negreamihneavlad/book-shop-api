var book = require('../services/book-service.js');

module.exports = {
  findOne: findOne,
  list: list,
  categories: categories,
  publishers: publishers,
  length: length,
  authors: authors,
  search: search,
  create: create,
  update: update,
  destroy: destroy
};

//////////////////////////////

/**
 * Search one book by id
 *
 * @param req
 * @param res
 */

function findOne(req, res) {
  book.getById(req.params.bookId)
    .then(function (book) {
      res.json(book);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Get all books
 *
 * @param req
 * @param res
 */
function list(req, res) {
  book.list(req.query)
    .then(function (books) {
      res.json(books);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}

/**
 * Get categories
 *
 * @param req
 * @param res
 */
function categories(req, res) {
  book.categories()
    .then(function (categories) {
      res.json(categories);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Get publishers
 *
 * @param req
 * @param res
 */
function publishers(req, res) {
  book.publishers()
    .then(function (publishers) {
      res.json(publishers);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Get authors
 *
 * @param req
 * @param res
 */
function authors(req, res) {
  book.authors()
    .then(function (authors) {
      res.json(authors);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Get length
 *
 * @param req
 * @param res
 */
function length(req, res) {
  book.length(req.query)
    .then(function (length) {
      res.json(length);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Search books by name or author and filters
 *
 * @param req
 * @param res
 */
function search(req, res) {
  book.search(req.query)
    .then(function (books) {
      res.json(books);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Create book
 *
 * @param req
 * @param res
 */
function create(req, res) {
  book.create(req.body)
    .then(function (book) {
      res.json(book);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Update book details
 *
 * @param req
 * @param res
 */
function update(req, res) {
  book.update(req.body,req.params.bookId)
    .then(function (bookSaved) {
      res.json(bookSaved);
    })
    
    .catch(function (err) {
      res.status(500).send(err);
    });
}
/**
 * Remove book
 *
 * @param req
 * @param res
 */
function destroy(req, res) {
  book.destroy(req.params.bookId)
    .then(function () {
      res.json();
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
}
