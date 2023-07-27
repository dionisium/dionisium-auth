// MODULES
import { FastifyInstance } from "fastify/types/instance";

// CONTROLLERS
import Controller from './controller'; 

// LIBS
import validator from './libs/validator';

export default class extends Controller {
    constructor(private routes:FastifyInstance, private path:string){super()}

    router(){
        this.routes.post(this.path + '/signin', {preValidation: validator}, this.signin);
        this.routes.post(this.path + '/signup', {preValidation: validator}, this.signup);
        this.routes.post(this.path + '/verify', {preValidation: validator}, this.verify);
        this.routes.post(this.path + '/withGoogle', {preValidation: validator}, this.withGoogle);
        this.routes.post(this.path + '/update/avatar', {preValidation: validator}, this.changeAvatar);
    }
}