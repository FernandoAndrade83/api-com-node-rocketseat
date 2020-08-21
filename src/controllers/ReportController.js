const User = require('../models/User');
const {Op} = require('sequelize');

module.exports = {
    async show (req, res) {
        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@gmail.com'
                }
            },
            include: [
                {
                    association: 'addresses', 
                    where: {street: 'Rua Letícia de Cerqueira Rossi'}
                },
                {
                    association: 'techs', 
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: '%java%'
                        }
                    }
                }
            ]
        })

        return res.json(users)
    }
}