import { Request, Response } from "express";
import puppeteer from 'puppeteer';



export default class StudentController {


    public async getStudentData(req: Request, res: Response): Promise<void> { 

        const { controlURL, passwordURL, psieURL, dummyURL } = req.body
        console.log(req.body);
        const browser = await puppeteer.launch({
            headless: false,
        });

        const page = await browser.newPage();
        const url = `${process.env.SERVER_PATH}Opc=DATOSALU&Control=${controlURL}&Password=${passwordURL}&psie=${psieURL}&dummy=${dummyURL}`
        console.log("url", url);
        await page.goto(url);

        const tds = await page.$$eval('td', (tdElements) => {
            // Obtener el texto de cada <td> y devolverlo como un array
            return tdElements.map(td => td.textContent.trim());
        });


        const personalData = await page.$$eval('p', (tdElements) => {
            // Obtener el texto de cada <td> y devolverlo como un array

            return tdElements.filter((element) => element.className === 'card-text').map(td => td.textContent.trim());
        });

        
        //console.log(tds);
        console.log(personalData);

        const data = {
            control: tds[6],
            fullName: tds[8],
            curp: tds[10],
            career: tds[16],
            plan: tds[18],
            specialty: tds[20],

            direction: {
                street: personalData[0],
                number: personalData[1],
                neighborhood: personalData[2],
                city: personalData[3],
                zipCode: personalData[4],
            },
            phone: personalData[5],
            email: personalData[6],
            birthdate: personalData[8],
            schoolProcedence: personalData[9],
            generation: personalData[10],
            validPeriods: personalData[11],
            currentPeriod: personalData[12],
            accumulatedCredits: personalData[13],
            status: personalData[14],
        }


       setTimeout(async () => {

        await browser.close();

        res.status(200).json(data)
        }, 1500);


    }

}