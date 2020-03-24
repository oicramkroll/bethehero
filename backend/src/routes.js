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
routes.post('/ongs', controlles.ong.create);

routes.get('/incidents', controlles.incidents.list );
routes.post('/incidents', controlles.incidents.create );
routes.delete('/incidents/:id', controlles.incidents.delete );

routes.get('/ongincidents',controlles.ongProfile.list);

module.exports = routes;