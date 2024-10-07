import {Router as router} from 'express'
import {update} from '../controllers/scoreController.js';
const Router=router();

Router.post('/score',update);


export default Router;
