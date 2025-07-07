const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Organization = sequelize.define(
  "Organization",
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
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255],
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "organizations",
    timestamps: true,
    hooks: {
      beforeCreate: async (org) => {
        if (org.logoUrl) {
          // Validate logo URL format if provided
          try {
            new URL(org.logoUrl);
          } catch (error) {
            throw new Error("Invalid logo URL format");
          }
        }
      },
      beforeUpdate: async (org) => {
        if (org.logoUrl) {
          // Validate logo URL format if provided
          try {
            new URL(org.logoUrl);
          } catch (error) {
            throw new Error("Invalid logo URL format");
          }
        }
      },
    },
  }
);

module.exports = Organization;
