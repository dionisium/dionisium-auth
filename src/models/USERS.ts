import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const user_schema = new Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    date:{type:Date, default:Date.now()},
    roles:[{type:String, required:true}],
    plain:[{type:String, required:true}],
    viewing:[{type:Object, ref:'viewing'}],
    avatar:{type:String, default:'deku'}
});

export async function encryptPassword (password) {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
}

export async function comparePassword (encryptPassword, password) {
    return await bcrypt.compare(password, encryptPassword);
}

export default model('user', user_schema);