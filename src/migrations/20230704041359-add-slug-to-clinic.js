'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'clinics', // tên bảng
      'slug', // tên cột mới
      {
        type: Sequelize.STRING,
        allowNull: true, // cho phép giá trị null
        // loại bỏ thuộc tính unique
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'clinics', // tên bảng
      'slug' // tên cột cần xóa
    );
  }
};
