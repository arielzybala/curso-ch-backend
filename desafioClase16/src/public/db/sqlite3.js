const knex= require('knex')
const config = require('../../../knexfile')
const db = knex(config.development)

module.exports.addUser = async (user, email) => {
    const [id] = await db('users').insert(user, email)
}

module.exports.addMessage = async (newMessage) => {
    const [message] = await db('messages').insert(newMessage)
}

module.exports.find = async () => {
    return db('users')
}

module.exports.findById = async (id) => {
    return db('users')
    .where({id})
    .first();
}

module.exports.findByName = async (name) => {
    return db('users')
    .where({name})
    .first();
}

module.exports.findByEmail = async (email) => {
    return db('users')
    .where({email})
    .first();
}

