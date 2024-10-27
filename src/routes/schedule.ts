import express, { Request, Response } from "express";
import ScheduleController from "../controllers/schedule.controller";

const router = express.Router();
const scheduleController = new ScheduleController();

router.post("", (req: Request, res: Response) => scheduleController.getSchedule(req, res));

router.post("/archived", (req: Request, res: Response) => scheduleController.getArchivedSchedule(req, res));

export default router