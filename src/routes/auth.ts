import express, { Request, Response } from "express";
import  AuthController from "../controllers/auth.controller";

const router = express.Router();

const authController = new AuthController();



router.post('/student', (req: Request, res: Response) => {

    console.log(req.body)
    return authController.authStudent(req, res)
});





export default router