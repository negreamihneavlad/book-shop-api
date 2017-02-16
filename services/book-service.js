var _ = require('lodash');
var book = require('../modules/book.js');
var Sequelize = require('sequelize');

module.exports = {
  getById: getById,
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
 * Get one book
 *
 * @param bookId
 * @returns {*}
 */
function getById(bookId) {
  return book.findOne({
    where: {
      id: bookId
    }
  })
    .then(function (book) {
      return book;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Get all books
 *
 * @param filters
 * @returns {*}
 */
function list(filters) {
  return book.findAll({
    offset: (filters.page - 1) * 20,
    limit: 20,
    where: {
      $and: [
        {author: {$like: '%' + _.get(filters, 'author', '') + '%'}},
        {category: {$like: '%' + _.get(filters, 'category', '') + '%'}},
        {publisher: {$like: '%' + _.get(filters, 'publisher', '') + '%'}}
      ]
    }
  })
    .then(function (books) {
      return books;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Get categories
 *
 * @returns {*}
 */
function categories() {
  return book.findAll({
    attributes: [Sequelize.literal('DISTINCT `category`'), 'category']
  })
    .then(function (categories) {
      return categories;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Get publishers
 *
 * @returns {*}
 */
function publishers() {
  return book.findAll({
    attributes: [Sequelize.literal('DISTINCT `publisher`'), 'publisher']
  })
    .then(function (publishers) {
      return publishers;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Get authors
 *
 * @returns {*}
 */
function authors() {
  return book.findAll({
    attributes: [Sequelize.literal('DISTINCT `author`'), 'author']
  })
    .then(function (authors) {
      return authors;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Get length
 *
 * @param filters
 * @returns {*}
 */
function length(filters) {
  return book.count({
    where: {
      $or: [
        {name: {$like: '%' + _.get(filters, 'toFind', '') + '%'}},
        {author: {$like: '%' + _.get(filters, 'toFind', '') + '%'}},
        {category: {$like: '%' + _.get(filters, 'toFind', '') + '%'}},
        {publisher: {$like: '%' + _.get(filters, 'toFind', '') + '%'}}
      ],
      $and: [
        {author: {$like: '%' + _.get(filters, 'author', '') + '%'}},
        {category: {$like: '%' + _.get(filters, 'category', '') + '%'}},
        {publisher: {$like: '%' + _.get(filters, 'publisher', '') + '%'}}
      ]
    }
  })
    .then(function (length) {
      return length;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Search for books
 *
 * @param filters
 * @returns {*}
 */
function search(filters) {
  return book.findAll({
    offset: (filters.page - 1) * 20,
    limit: 20,
    where: {
      $or: [
        {name: {$like: '%' + filters.toFind + '%'}},
        {author: {$like: '%' + filters.toFind + '%'}},
        {category: {$like: '%' + filters.toFind + '%'}},
        {publisher: {$like: '%' + filters.toFind + '%'}}
      ],
      $and: [
        {author: {$like: '%' + _.get(filters, 'author', '') + '%'}},
        {category: {$like: '%' + _.get(filters, 'category', '') + '%'}},
        {publisher: {$like: '%' + _.get(filters, 'publisher', '') + '%'}}
      ]
    }
  })
    .then(function (books) {
      return books;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Add book
 *
 * @param bookData
 * @returns {*}
 */
function create(bookData) {
  return book.create(bookData)
    .then(function (book) {
      return book;
    })
    .catch(function (err) {
      return err;
    });
}

/**
 * Update book data
 *
 * @param bookData
 * @param bookId
 * @returns {*}
 */
function update(bookData, bookId) {
  return book.update(bookData, {
    where: {
      id: bookId
    }
  })
    .then(function () {
      return book.findOne({
          where: {
            id: bookId
          }
        }
      )
    })
    .then(function (bookSaved) {
      return bookSaved;
    })
    
    .catch(function (err) {
      return err;
    });
}

/**
 * Remove book
 *
 * @param bookId
 * @returns {*}
 */
function destroy(bookId) {
  return book.destroy({
    where: {
      id: bookId
    }
  })
    .then(function () {
      return true;
    })
    .catch(function (err) {
      return err;
    });
}