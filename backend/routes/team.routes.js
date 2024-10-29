import { Router as router } from "express";
import { TeamStatus } from "../controllers/teamController.js";

const Router = router();

Router.get("/team/:id", TeamStatus);
Router.get("/team/teamName",TeamStatus);

export default Router;
