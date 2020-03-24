const crypto = require('crypto');
const connection = require('../database/connections');

module.exports = {
    list: async(req,res)=>{
        const result = await connection('ongs').select('*');
        return res.json(result);
    },
    create: async (req,res)=>{
        const { name, email, whatsapp, city, state } = req.body;
        const id = crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            state
        })
        return res.json({id});
    }
}