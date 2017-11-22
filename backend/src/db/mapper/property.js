module.exports = function(sequelize, DataTypes) {
    return sequelize.define('property', {
        propertyIdx: {
            type: DataTypes.INTEGER(11),primaryKey: true, autoIncrement: true,allowNull : false
        },
        propertyTitle: {type: DataTypes.STRING(50), allowNull : false, defaultValue:''},
        typeIdx: {type: DataTypes.INTEGER(11), allowNull : false, defaultValue:0},
        targetAmount: {type: DataTypes.INTEGER(50), allowNull : false, defaultValue: 0},
        startDate: {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        completeDate : {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        userIdx : {type : DataTypes.INTEGER(11), allowNull : false, defaultValue:0},
        delFlag: {type: DataTypes.STRING(11), allowNull : false, defaultValue:'N'}
    },{
        tableName: 'property',
        timestamps: false
    });
};