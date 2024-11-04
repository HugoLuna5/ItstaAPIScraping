import { Request, Response } from "express";
import puppeteer from 'puppeteer';


export default class AuthController { 


    public async authStudent(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body
        console.log(req.body);
        const browser = await puppeteer.launch({
            headless: true,
        });
    
        const page = await browser.newPage();
    
        await page.goto(`${process.env.SERVER_PATH}Opc=PINDEXESTUDIANTE&psie=intertec&dummy=0`);

        await page.type('input[name="Control"]', username); // Cambia el selector y el valor
        await page.type('input[name="password"]', password);
        await page.click('input[type="submit"]');
        
        setTimeout(async () => {


            const result = await page.evaluate(() => {
                //principal
                const menuTop: any = document.querySelector('frame[name="menuTop"]');
                const mainFrame: any = document.querySelector('frame[name="principal"]');


                const parsedUrlMenuTop = new URL(menuTop.src);
                const paramsMenuTop = new URLSearchParams(parsedUrlMenuTop.search);

                const controlURL = paramsMenuTop.get('Control');
                const passwordURL = paramsMenuTop.get('Password');
                const psieURL = paramsMenuTop.get('psie');
                const dummyURL = paramsMenuTop.get('dummy');

    
                return {
                    menuTop: menuTop.src,
                    mainFrame: mainFrame.src,

                    access: {
                        controlURL,
                        passwordURL,
                        psieURL,
                        dummyURL
                    }
                }
            });


           

            await browser.close();

            res.status(200).json({
                result
            })
        }, 2000)
    
    
    
    
        
    }


}

