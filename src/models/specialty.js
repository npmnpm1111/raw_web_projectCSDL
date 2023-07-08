'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Specialty.init(
    {
      // Define fields here
    },
    {
      sequelize,
      modelName: 'Specialty',
    }
  );

  return Specialty;
};
