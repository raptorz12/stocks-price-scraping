import puppeteer from "puppeteer";
import { stocks, start_timestamp, end_timestamp } from "./option.js";

//Scroll page to bottom
async function scrollDown(page) {
  await page.evaluate(async function(){
    scrollTo(0, 9999);
  });
}

//Launch browser
const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: false,
});

//Create new page
const page = await browser.newPage();

let stocks_price = [];

for (let i = 0; i < stocks.length; i++) {
  await page.goto(`https://finance.yahoo.com/quote/${stocks[i]}.JK/history?period1=${start_timestamp}&period2=${end_timestamp}&interval=1mo`, {timeout: 0, waitUntil: "networkidle2"});

  await scrollDown(page)

  //Get stocks price data each month 
  const a = await page.$$eval('table > tbody > tr', (el) => {
    return el.map((el) => {
      if (el.querySelector('td:nth-child(3)') !== null) {
        let date = el.querySelector('td:nth-child(1) > span').textContent
        let new_date = new Date(date)
        const year = new_date.getFullYear()

        return {
          'date' : year,
          'highest' : el.querySelector('td:nth-child(3) > span').textContent,
          'lowest' : el.querySelector('td:nth-child(4) > span').textContent,
        }
      }
    })
  });

  //Remove null element in array
  const result = a.filter((element) => element!=null);

  let highest = 0;
  let lowest = 0;
  let year_data = "";
  let arraya = [];

  //Compare highest and lowest stocks data in a year
  result.forEach((data) => {
    if (year_data != data.date) {
      if (year_data != "") {
        arraya.push({
          'year': year_data, 
          'highest': highest, 
          'lowest': lowest,
          'stocks': stocks[i],
        })
      } 
    }

    highest = data.highest
    lowest = data.lowest
    year_data = data.date
  })

  stocks_price = [...stocks_price, {[stocks[i]] : arraya}]
  // stocks_price = [...stocks_price, arraya]
}

console.log(stocks_price)

//Close browser
await browser.close()