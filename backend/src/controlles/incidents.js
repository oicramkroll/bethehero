const connection = require('../database/connections');

module.exports = {
    list: async(req,res)=>{
        const {page = 1} = req.query; 

        const [count] = await connection('incidents').count();

        const result = await connection('incidents')
        .join('ongs','ongs.id','=','incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5).select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.state',
        ]);

        res.header('X-Total-count',count['count(*)']);

        return res.json(result);
    },
    create: async (req,res)=>{
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;
        const [id] = await connection('incidents').insert({
            title, 
            description, 
            value,
            ong_id
        })
        return res.json({id});
    },
    delete: async(req,res)=>{
        const {id} = req.params;
        const ong_id = req.headers.authorization;
        const result = await connection('incidents')
        .where('id',id)
        .select('ong_id')
        .first();
        if(result.ong_id !== ong_id){
            return res.status(401).json({error: 'não é possivel deletar o registro de outra organização.'});
        }

        await connection('incidents').where('id',id).delete();

        return res.status(204).send();
    }
}