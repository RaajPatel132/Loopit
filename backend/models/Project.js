const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Organization = require("./Organization");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [0, 24],
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    organization: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "organizations",
        key: "id",
      },
    },
  },
  {
    tableName: "projects",
    timestamps: true,
  }
);

module.exports = Project;
