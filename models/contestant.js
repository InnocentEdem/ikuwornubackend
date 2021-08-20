'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contestant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contestant.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    sessionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contestant',
  });
  return Contestant;
};