import express, { Request, Response } from "express";
import QualificationsController from "../controllers/qualifications.controller";

const router = express.Router();

const qualificationsController = new QualificationsController();

router.post("", (req: Request, res: Response) => qualificationsController.getQualifications(req, res));

router.post("/archived", (req: Request, res: Response) => qualificationsController.getArchivedQualifications(req, res));


export default router;