const connection = require('../database/connections');

module.exports = {
    login: async (req,res)=>{
        const {id} = req.body;
        const result = await connection('ongs')
        .where('id',id)
        .select('*')
        .first();
        if(!result){
            return res.status(404).json({error:'Organização inesistente!'});
        }
        return res.json(result);
    }
}