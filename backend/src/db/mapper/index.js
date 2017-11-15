import fs from 'fs';
import path from 'path';
import Sequelize from 'Sequelize';
import dbConfig from '../../config/dbConfig';

const env       = process.env.NODE_ENV !== 'production' && 'development' ;
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.id, dbConfig.development.password,
                                {host: dbConfig.development.host, port : dbConfig.development.port, dialect: dbConfig.development.dialect});

let db   = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        let model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;
