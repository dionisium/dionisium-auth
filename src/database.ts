import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

mongoose.connect(process.env.URI_MONGODB)
    .then(db => console.log('database on connection'))
    .catch(err => console.error(err));