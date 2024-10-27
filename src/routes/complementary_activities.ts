import express, { Request, Response } from "express";
import ComplementaryActivitiesController from "../controllers/complementary_activities.controller";
const router = express.Router();

const complementaryActivitiesController = new ComplementaryActivitiesController();

router.post("", (req: Request, res: Response) => complementaryActivitiesController.getComplementaryActivities(req, res));

export default router