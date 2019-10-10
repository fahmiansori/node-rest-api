/* Pagination */
const sequelizePaginate = require('sequelize-paginate')
/* End Pagination */

module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  /* Pagination */
  sequelizePaginate.paginate(Book)
  /* End Pagination */
  
  return Book;
};
