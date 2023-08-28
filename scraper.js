import puppeteer from "puppeteer";
import { stocks, startTimestamp, endTimestamp } from "./option.js";

//Scroll page to bottom
async function scrollDown(page) {
  await page.evaluate(async () => {
    scrollTo(0, 9999);
  });
}

//Get stocks price
const getStocksPrice = async () => {
  let stocksPrice = [];

  //Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: false,
  });

  //Create new page
  const page = await browser.newPage();

  for (let i = 0; i < stocks.length; i++) {
    await page.goto(`https://finance.yahoo.com/quote/${stocks[i]}.JK/history?period1=${startTimestamp}&period2=${endTimestamp}&interval=1mo`, {timeout: 0, waitUntil: "networkidle2"});
  
    await scrollDown(page)
  
    //Get stocks price data each month 
    const stocksMonthlyData = await page.$$eval('table > tbody > tr', (el) => {
      return el.map((el) => {
        if (el.querySelector('td:nth-child(3)') !== null) {
          let date = el.querySelector('td:nth-child(1) > span').textContent
          let newDate = new Date(date)
          const year = newDate.getFullYear()
  
          return {
            "date" : year,
            "highest" : el.querySelector('td:nth-child(3) > span').textContent,
            "lowest" : el.querySelector('td:nth-child(4) > span').textContent,
          }
        }
      })
    });
  
    //Remove null element in array
    const result = stocksMonthlyData.filter((element) => element!=null);
  
    let highest = 0;
    let lowest = 0;
    let year_data = "";
    let stocksData = [];
  
    //Compare highest and lowest stocks data in a year
    result.forEach((data) => {
      data.highest = data.highest.replace(/,/g, '')
      data.lowest = data.lowest.replace(/,/g, '')

      if (year_data != data.date) {
        if (year_data != "") {
          stocksData.push({
            "year": year_data, 
            "highest": highest, 
            "lowest": lowest,
          })
        }

        highest = parseInt(data.highest)
        lowest = parseInt(data.lowest)
      } else {
        if (highest < parseInt(data.highest)) {
          highest = parseInt(data.highest)
        }

        if (lowest==0 || lowest > parseInt(data.lowest)) {
          lowest = parseInt(data.lowest)
        }
      }
      year_data = data.date
    })
  
    stocksData.push({
      "year": year_data, 
      "highest": highest, 
      "lowest": lowest,
    })

    stocksPrice = [...stocksPrice, {"name": stocks[i], "data" : stocksData}]
  }
  
  //Close browser
  await browser.close();
  
  return stocksPrice;
}

export let allStocksData = await getStocksPrice()