import {Router as router} from 'express'
import {update} from '../controllers/scoreController.js';
import {leaderBoard} from '../controllers/scoreController.js';
const Router=router();

Router.post('/update',update);
Router.post('/leaderboard',leaderBoard);



export default Router;
