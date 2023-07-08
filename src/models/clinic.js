'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinic extends Model {
    static associate(models) {
      this.belongsTo(models.Specialty, { foreignKey: 'SpecialtyId' });
    }
  };
  Clinic.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    slug: DataTypes.STRING,
    SpecialtyId: DataTypes.INTEGER, // Add this line
  }, {
    sequelize,
    modelName: 'Clinic',
  });
  return Clinic;
};
