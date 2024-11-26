const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Đường dẫn tới config database

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    id_status: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'status', // Tên bảng status
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    id_assignee: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user', // Tên bảng user
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    id_reporter: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user', // Tên bảng user
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    id_sprint: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'sprint', // Tên bảng sprint
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    no_task: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
    tableName: 'task',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Task;
