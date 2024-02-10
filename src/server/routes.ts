// MODULES
import { FastifyInstance } from "fastify/types/instance";
import { FastifyPluginOptions } from "fastify";
import { _Body_ChangeAvatar, _Body_Signin, _Body_Signup, _Body_Verify, _Body_WithGoogle, _Response } from "../libs/schemas";


// CONTROLLERS
import Controller from './controller'; 

export default function (fastify:FastifyInstance, options:FastifyPluginOptions, done:Function){
    fastify.route({
        method:'POST',
        url:'/signin',
        handler:Controller.signin,
        schema:{body:_Body_Signin, response:_Response},
    });
    fastify.route({
        method:'POST',
        url:'/signup',
        handler:Controller.signup,
        schema:{body:_Body_Signup, response:_Response}        
    });
    fastify.route({
        method:'POST',
        url:'/verify',
        handler:Controller.verify,
        schema:{body:_Body_Verify, response:_Response}
    });
    fastify.route({
        method:'POST',
        url:'/withGoogle',
        handler:Controller.withGoogle,
        schema:{body:_Body_WithGoogle, response:_Response}
    });
    fastify.route({
        method:'POST',
        url:'/update/avatar',
        handler:Controller.changeAvatar,
        schema:{body:_Body_ChangeAvatar, response:_Response}
    });
    done();
}