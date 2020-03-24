const connection = require('../database/connections');
module.exports = {
    list: async (req,res)=>{
        const ong_id = req.headers.authorization;
        const result = await connection('incidents').where('ong_id',ong_id).select('*');
        return res.json(result);
    }
}