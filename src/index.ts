// DOTENV
const PROD = process.env.PRODUCTION || false;
if(PROD == false){
    const {config} = require('dotenv');
    config();
}

// IMPORTS
import fastify from 'fastify';
import cors from '@fastify/cors';
import MOD from 'method-override';
import routes from './routes';

async function start():Promise<void>{
    const app = fastify({logger:true});
    await app.register(cors);
    require('./database');

    // ROUTES
    new routes(app, '/api').router();

    // SERVER
    const PORT = process.env.PORT || 3560;
    app.listen(PORT, ()=>{
        console.log('server on port:' + PORT);
    });
}

start();