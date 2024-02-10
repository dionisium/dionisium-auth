// MODELS
import users_model, { encryptPassword, comparePassword } from'../models/USERS';

// LIBS
import JsonWebTokenLibs from '../libs/jsonwebtoken_config';
const JWTLibs = new JsonWebTokenLibs();

// MODULES
import { FastifyReply } from 'fastify/types/reply';

// TYPES
import { user } from '../libs/models';

class ctrl {
    async signup(req, reply:FastifyReply){
        const {name, email, password} = req.body;
        if(!email.includes('@') || !email.includes('.com') || email.length < 12 || /\S/.test(email)){
            return reply.code(400).send({_error:'the email is invalid'});
        }
        if(password.length < 8 || !/\d/.test(password) || /\S/.test(password)){
            return reply.code(400).send({_error:'the password is invalid'});
        }
        const userFound:user = await users_model.findOne({email});
        if(userFound){return reply.code(400).send({_error:'the email already is use'});}
    
        const user = new users_model({
            name,
            email,
            password: await encryptPassword(password),
            plain:['started pack']
        });
        await user.save();
    
        const token = await JWTLibs.sing(user._id);
        return reply.code(200).send({_token:token, _plain:user.plain, _avatar:user.avatar});
    }

    async signin(req, res:FastifyReply){
        const {email, password} = req.body;
        const userFound:user = await users_model.findOne({email});
        if(!userFound){return res.code(401).send({_error:'the email or password are incorrect'});}
        const result:boolean = await comparePassword(userFound.password, password);
        if(result == false){return res.code(401).send({_error:'the email or password are incorrect'});}
    
        const token = await JWTLibs.sing(userFound._id);
        return res.code(200).send({_token:token, _plain:userFound.plain, _avatar:userFound.avatar});
    }

    async withGoogle(req, res:FastifyReply){
        const {name, email, id} = req.body;
        const userFound:user = await users_model.findOne({email});
        if(userFound){
            const token = await JWTLibs.sing(userFound._id);
            return res.code(200).send({_token:token, _plain:userFound.plain, _avatar:userFound.avatar});
        }
    
        const user = new users_model({
            name,
            email,
            password: await encryptPassword(id),
            roles:'user',
            plain:'started pack'
        });
        await user.save();
    
        const token = await JWTLibs.sing(user._id);
        return res.code(200).send({token:token, plain:user.plain, avatar:user.avatar});
    }

    async verify(req, res:FastifyReply){
        const { token } = req.body;
        const decoded = await JWTLibs.decoded(token);
        if(!decoded){return res.code(401).send({_error:'you is not authorized or the token is expired'});}
        const userFound = await users_model.findById(decoded?.["_id"]);
        if(!userFound){return res.code(401).send({_error:'you is not authorized or the token is expired'});}
        return res.code(200).send({_token:token, _plain:userFound.plain, _avatar:userFound.avatar});
    }

    async changeAvatar(req, res:FastifyReply){
        try {
            const { token, avatar } = req.body;
            const decoded = await JWTLibs.decoded(token);
            if(!decoded){return res.code(401).send({error:'you is not authorized or the token is expired'});}
            await users_model.findByIdAndUpdate(decoded?.["_id"], {avatar:avatar});
            res.code(200).send({message:'update'});
        } catch {
            return res.code(501).send({error:'error unexpected'});
        }
    }
}

export default new ctrl();