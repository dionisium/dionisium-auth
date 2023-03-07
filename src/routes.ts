import { Router } from 'express';
const router = Router();

import controller_import from './controller'; 
const controller = new controller_import();
import validator from './libs/validator';

router.post('/signup', validator, controller.signup);
router.post('/signin', validator, controller.signin);
router.post('/verify', validator, controller.verify);
router.post('/withGoogle', validator, controller.withGoogle);
router.post('/update/avatar', validator, controller.changeAvatar);

export default router;