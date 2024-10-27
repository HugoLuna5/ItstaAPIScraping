import express, { Request, Response } from "express";
import PaymentServicesController from "../controllers/payment_services.controller";
const router = express.Router();

const paymentServicesController = new PaymentServicesController();

router.post("", (req: Request, res: Response) => paymentServicesController.getPaymentServices(req, res));

export default router