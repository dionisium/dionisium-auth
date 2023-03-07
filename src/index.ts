// DOTENV
const PROD = process.env.PRODUCTION || false;
if(PROD == false){
    const {config} = require('dotenv');
    config();
}

// IMPORTS
import morgan from 'morgan';
import cors from 'cors';
import MOD from 'method-override';
import express from 'express';
const app = express();
require('./database');

// MIDLEWARES
app.use(MOD('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// ROUTES
import routes from './routes';
app.use('/api' , routes);

// SERVER
app.set('port', process.env.PORT || 3400);
app.listen(app.get('port'), ()=>{
    console.log('server on port:' + app.get('port'));
});