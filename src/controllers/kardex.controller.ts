import { Request, Response } from "express";
import puppeteer from 'puppeteer';

export default class KardexController {


    public async getKardex(req: Request, res: Response): Promise<void> {
        const { controlURL, passwordURL, psieURL, dummyURL } = req.body
        console.log(req.body);
        const browser = await puppeteer.launch({
            headless: true,
        });


        const page = await browser.newPage();
        const url = `${process.env.SERVER_PATH}Opc=KARDEX&Control=${controlURL}&Password=${passwordURL}&psie=${psieURL}&dummy=${dummyURL}`
        console.log("url", url);
        await page.goto(url);

        const tds = await page.$$eval('td', (tdElements) => {
            // Obtener el texto de cada <td> y devolverlo como un array
            return tdElements.map(td => td.textContent.trim());
        });

        //console.log(tds);
        let matters = [];

        for (let i = 53; i < tds.length; i++) {
            if(tds[i] !== "" && tds[i] !== "KARDEX LISTA" && tds[i] !== "KARDEX"){ 
                matters.push(tds[i]);
            }
        }

        const data = {
            activePeriod: tds[1],
            admissionDate: tds[22],
            graduationDate: tds[26],
            status: tds[28],
            creditPlan: tds[30],
            creditAproved: tds[32],
            percentage: tds[34],
            totalMatters: tds[36],
            cursedMatters: tds[38],
            approvedMatters: tds[40],
            promWithRep: tds[42],
            promWithOutRep: tds[44],
            semester: tds[46],
            matters: matters
        }


        //51 matters




        setTimeout(async () => {

            await browser.close();
    
            res.status(200).json(data)
            }, 1500);
    }

}    