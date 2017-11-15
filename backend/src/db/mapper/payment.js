/**
 * Created by hwangseong-in on 2017. 9. 6..
 */

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('payment', {
        paymentNo: {
            type: DataTypes.INTEGER(11),primaryKey: true, autoIncrement: true,allowNull : false
        },
        churchCode: {type: DataTypes.INTEGER(11), allowNull : false},
        recvPrice: {type: DataTypes.INTEGER(11), allowNull : false, defaultValue:''},
        method: {type: DataTypes.STRING(1), allowNull : false, defaultValue:''},
        depositor: {type: DataTypes.STRING(50), allowNull : false, defaultValue:''},
        payDate: {type: DataTypes.INTEGER(11), allowNull : false, defaultValue:''},
        writeManager : {type : DataTypes.STRING(50), allowNull : false, defaultValue:''},
        tax : {type : DataTypes.STRING(3), allowNull : false, defaultValue:''},
        writeDate : {type : DataTypes.INTEGER(11), allowNull : false, defaultValue:''}
    },{
        tableName: 'payment',
        timestamps: false
    });
};