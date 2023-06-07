const DataTypes = require('sequelize')
const db = require('../db/conn')
const Verdura = db.define('verdura', {
    verduras: {
        type: DataTypes.STRING(20)
    },
    quantidade: {
        type: DataTypes.INTEGER(5)
    },
    preco: {
        type: DataTypes.FLOAT(6)
    }
},{
    updatedAt:  false,
    createdAt: false
})

// Verdura.sync({force:true})
module.exports = Verdura