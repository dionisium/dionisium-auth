// MODELS
import users_model, { encryptPassword, comparePassword } from'./models/USERS';

// LIBS
import JsonWebTokenLibs from './libs/jsonwebtoken_config';
const JWTLibs = new JsonWebTokenLibs();

// MODULES
import { FastifyReply } from 'fastify/types/reply';

// TYPES
import { user } from './models';

export default class {
    async signup(req, res:FastifyReply){
        const {name, email, password} = req.body;
        const userFound:user = await users_model.findOne({email});
    
        if(userFound){return res.code(401).send({error:'the email already is use'});}
        if(password.length < 8){return res.code(401).send({error:'the password is too short'});}
    
        const user:any = new users_model({
            name,
            email,
            password: await encryptPassword(password),
            roles:'user',
            plain:'started pack'
        });
        await user.save();
    
        const token = await JWTLibs.sing(user._id);
        return res.code(200).send({token:token, plain:user.plain, avatar:user.avatar});
    }

    async signin(req, res:FastifyReply){
        const {email, password} = req.body;
        const userFound:user = await users_model.findOne({email});
        if(!userFound){return res.code(401).send({error:'the email or password are incorrect'});}
        const result:boolean = await comparePassword(userFound.password, password);
        if(result == false){return res.code(401).send({error:'the email or password are incorrect'});}
    
        const token = await JWTLibs.sing(userFound._id);
        return res.code(200).send({token:token, plain:userFound.plain, avatar:userFound.avatar});
    }

    async withGoogle(req, res:FastifyReply){
        try {
            const {name, email, id} = req.body;
            const userFound:user = await users_model.findOne({email});
            if(userFound){
                const token = await JWTLibs.sing(userFound._id);
                return res.code(200).send({token:token, plain:userFound.plain, avatar:userFound.avatar});
            }
    
            const user:any = new users_model({
                name,
                email,
                password: await encryptPassword(id),
                roles:'user',
                plain:'started pack'
            });
            await user.save();
        
            const token = await JWTLibs.sing(user._id);
            return res.code(200).send({token:token, plain:user.plain, avatar:user.avatar});
            
        } catch (error) {
            console.log(error);
            return res.code(400).send({error:'error unexpected'});
        }
    }

    async verify(req, res:FastifyReply){
        try {
            const { token } = req.body;
            const decoded = await JWTLibs.decoded(token);
            if(decoded == 'error unexpected'){return res.code(401).send({error:'you is not authorized or the token is expired'});}
            const userFound = await users_model.findById(decoded?.["_id"]);
            return res.code(200).send({token:token, plain:userFound.plain, avatar:userFound.avatar});
        } catch (error) {
            console.log(error);
            return res.code(400).send({error:'error unexpected'});
        }
    }

    async changeAvatar(req, res:FastifyReply){
        try {
            const { token, avatar } = req.body;
            const decoded = await JWTLibs.decoded(token);
            if(decoded == 'error unexpected'){return res.code(401).send({error:'you is not authorized or the token is expired'});}
            await users_model.findByIdAndUpdate(decoded?.["_id"], {avatar:avatar});
            res.code(200).send({message:'update'});
        } catch (error) {
            console.log(error);
            return res.code(400).send({error:'error unexpected'});
        }
    }
}