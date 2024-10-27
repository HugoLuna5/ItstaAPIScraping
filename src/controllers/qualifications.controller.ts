import { Request, Response } from "express";
import puppeteer from 'puppeteer';

export default class QualificationsController {

    public async getQualifications(req: Request, res: Response): Promise<void> {
        
        const { controlURL, passwordURL,  psieURL, dummyURL } = req.body
        console.log(req.body);
        const browser = await puppeteer.launch({
            headless: false,
        });


        const page = await browser.newPage();
        const url = `${process.env.SERVER_PATH}Opc=CALIF&Control=${controlURL}&Password=${passwordURL}&psie=${psieURL}&dummy=${dummyURL}`
        console.log("url", url);
        await page.goto(url);

        const trs = await page.$$eval('tr', (tdElements) => {
            console.log(tdElements.length)
            // Obtener el texto de cada <td> y devolverlo como un array
            return tdElements.map(tr => {

                const celdas = tr.querySelectorAll('td');
                return Array.from(celdas).map(td => {

                    const span = td.querySelector('span');

                    if (td.textContent.trim() !== "") {
                        if(span){

                            const onclick = span.getAttribute('onclick');
    
                            const content = onclick.split("javascript:window.location='")[1]
    
                            return {
                                title:td.textContent.trim(),
                                link: content.split("'")[0],
                                downloadable: true
                            }
                        } else {
                            return {
                                title:td.textContent.trim(),
                                link: '',
                                downloadable: false
                            }
                        }
                    }

                })
            });
        });

        const elementsFiltered = trs.filter((element, idx) => idx > 3)

        const elementsNotCorrectRemoved = elementsFiltered.filter((element, idx) =>  element.length > 1) 

        let qualifications = [];
        let archivedQualifications = [];

        for (let i = 0; i < elementsNotCorrectRemoved.length; i++) {

            for (let j = 0; j < elementsNotCorrectRemoved[i].length; j++) {
                if(elementsNotCorrectRemoved[i][j] !== null){
                    if(elementsNotCorrectRemoved[i][j].downloadable){
                        archivedQualifications.push(elementsNotCorrectRemoved[i][j]);
                    } else {
                        qualifications.push(elementsNotCorrectRemoved[i][j]);
                    }
                }
            }
        }



        const data = {
            qualifications: qualifications,
            archivedQualifications: archivedQualifications,
        }

        setTimeout(async () => {

            await browser.close();
    
            res.status(200).json(data)
        }, 1500);




    }


    public async getArchivedQualifications(req: Request, res: Response): Promise<void> {

        
        const { controlURL, passwordURL, periodURL, psieURL, dummyURL } = req.body
        console.log(req.body);
        const browser = await puppeteer.launch({
            headless: false,
        });


        const page = await browser.newPage();
        const url = `${process.env.SERVER_PATH}Opc=BOLETA&Control=${controlURL}&Password=${passwordURL}&Periodo=${periodURL}&psie=${psieURL}&dummy=${dummyURL}`
        console.log("url", url);
        await page.goto(url);

        //PDFdoc
        const result = await page.evaluate(() => {
            const pdfdoc = document.getElementsByClassName('pdfdoc')[0];
            return pdfdoc.getAttribute('src');
        });

        const data = {
            download: `${process.env.SEVER_BASE_PATH}${result}`,
        }


        setTimeout(async () => {

            await browser.close();
    
            res.status(200).json(data)
        }, 1500);

    }

}