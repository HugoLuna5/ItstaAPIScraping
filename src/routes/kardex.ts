import express, { Request, Response } from "express";
import KardexController from "../controllers/kardex.controller";
const router = express.Router();

const kardexController = new KardexController();

router.post("", (req: Request, res: Response) => kardexController.getKardex(req, res));


export default router