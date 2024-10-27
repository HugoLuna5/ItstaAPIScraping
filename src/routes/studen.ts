import express, { Request, Response } from "express";
import StudentController from "../controllers/student.controller";
const router = express.Router();

const studentController = new StudentController();

router.post("", (req: Request, res: Response) => studentController.getStudentData(req, res));


export default router