import { Router as router } from "express";
import { TeamStatus } from "../controllers/teamController.js";

const Router = router();

Router.get("/team/status/teamCode", TeamStatus);
Router.get("/team/status/teamName",TeamStatus);

export default Router;
