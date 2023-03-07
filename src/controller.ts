import users_model, { encryptPassword, comparePassword } from'./models/USERS';
import jwt_libs from './libs/jsonwebtoken_config';
import { user } from './models';

export default class ctrl extends jwt_libs{
    async signup(req, res){
        const {name, email, password} = req.body;
        const userFound:user = await users_model.findOne({email});
    
        if(userFound){return res.status(401).json({error:'the email already is use'});}
        if(password.length < 8){return res.status(401).json({error:'the password is too short'});}
    
        const user:any = new users_model({
            name,
            email,
            password: await encryptPassword(password),
            roles:'user',
            plain:'started pack'
        });
        await user.save();
    
        const token:any = await ctrl.sing(user._id);
        return res.status(200).json({token:token, plain:user.plain, avatar:user.avatar});
    }

    async signin(req, res){
        const {email, password} = req.body;
        const userFound:user = await users_model.findOne({email});
        if(!userFound){return res.status(401).json({error:'the email or password are incorrect'});}
        const result:boolean = await comparePassword(userFound.password, password);
        if(result == false){return res.status(401).json({error:'the email or password are incorrect'});}
    
        const token = await ctrl.sing(userFound._id);
        return res.status(200).json({token:token, plain:userFound.plain, avatar:userFound.avatar});
    }

    async withGoogle(req, res){
        try {
            const {name, email, id} = req.body;
            const userFound:user = await users_model.findOne({email});
            if(userFound){
                const token = await ctrl.sing(userFound._id);
                return res.status(200).json({token:token, plain:userFound.plain, avatar:userFound.avatar});
            }
    
            const user:any = new users_model({
                name,
                email,
                password: await encryptPassword(id),
                roles:'user',
                plain:'started pack'
            });
            await user.save();
        
            const token = await ctrl.sing(user._id);
            return res.status(200).json({token:token, plain:user.plain, avatar:user.avatar});
            
        } catch (error) {
            console.log(error);
            return res.status(400).json({error:'error unexpected'});
        }
    }

    async verify(req, res){
        try {
            const { token } = req.body;
            const decoded = await ctrl.decoded(token);
            if(decoded == 'error unexpected'){return res.status(401).json({error:'you is not authorized or the token is expired'});}
            const userFound = await users_model.findById(decoded._id);
            const newtoken = await ctrl.sing(decoded._id);
            return res.status(200).json({token:newtoken, plain:userFound.plain, avatar:userFound.avatar});
        } catch (error) {
            console.log(error);
            return res.status(400).json({error:'error unexpected'});
        }
    }

    async changeAvatar(req, res){
        try {
            const { token, avatar } = req.body;
            const decoded = await ctrl.decoded(token);
            if(decoded == 'error unexpected'){return res.status(401).json({error:'you is not authorized or the token is expired'});}
            await users_model.findByIdAndUpdate(decoded._id, {avatar:avatar});
            res.status(200).json({message:'update'});
        } catch (error) {
            console.log(error);
            return res.status(400).json({error:'error unexpected'});
        }
    }
}