const {celebrate, Segments, Joi} = require('celebrate');
const expess = require('express');
const routes = expess.Router();
const controlles = {
    ong:require('./controlles/ong'),
    incidents:require('./controlles/incidents'),
    ongProfile:require('./controlles/ongProfile'),
    sessions:require('./controlles/sessions')
}; 

routes.post('/sessions',controlles.sessions.login);

routes.get('/ongs', controlles.ong.list);
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name:Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city:Joi.string().required(),
        state:Joi.string().length(2)
    })
}), controlles.ong.create);

routes.get('/incidents', controlles.incidents.list );
routes.post('/incidents', controlles.incidents.create );
routes.delete('/incidents/:id', controlles.incidents.delete );

routes.get('/ongincidents',celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required()
        }).unknown()
    })
    ,controlles.ongProfile.list);

module.exports = routes;