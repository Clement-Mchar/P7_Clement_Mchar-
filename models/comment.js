'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      //this.belongsTo(Post, { foreignKey: "commenterId" });
      // define association here
    }
  }
  comment.init({
    commenterId: DataTypes.STRING,
    commenterName: DataTypes.STRING,
    text: DataTypes.STRING,
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};