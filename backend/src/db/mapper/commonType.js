module.exports = function(sequelize, DataTypes) {
    return sequelize.define('commonType', {
        typeIdx: {
            type: DataTypes.INTEGER(11),primaryKey: true, autoIncrement: true,allowNull : false
        },
        typeName: {type: DataTypes.STRING(11), allowNull : false, defaultValue:''},
    },{
        tableName: 'commonType',
        timestamps: false
    });
};