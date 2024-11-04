import { Request, Response } from "express";
import puppeteer from 'puppeteer';


export default class ComplementaryActivitiesController {


    public async getComplementaryActivities(req: Request, res: Response): Promise<void> {

        const { controlURL, passwordURL, psieURL, dummyURL } = req.body
        console.log(req.body);
        const browser = await puppeteer.launch({
            headless: true,
        });


        const page = await browser.newPage();
        const url = `${process.env.SERVER_PATH}Opc=ACOMPL&Control=${controlURL}&Password=${passwordURL}&psie=${psieURL}&dummy=${dummyURL}`
        console.log("url", url);
        await page.goto(url);


        const trs = await page.$$eval('tr', (tdElements) => {
            console.log(tdElements.length)
            // Obtener el texto de cada <td> y devolverlo como un array
            return tdElements.map(tr => {

                const celdas = tr.querySelectorAll('td');
                return Array.from(celdas).map(td => td.textContent.trim());
            });
        });

        const elementsFiltered = trs.filter((element, idx) => idx > 3)

        const elementsNotCorrectRemoved = elementsFiltered.filter((element, idx) => element[0] !== '' )

        
        const data = {
            activities: elementsNotCorrectRemoved,
            total: elementsNotCorrectRemoved.length
        }

        setTimeout(async () => {

            await browser.close();
    
            res.status(200).json(data)
        }, 1500);

    }

}