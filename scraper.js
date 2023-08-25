import puppeteer from "puppeteer";

async function scrollDown(page) {
  await page.evaluate(async function(){
    scrollTo(0, 9999);
  });
}

const browser = await puppeteer.launch({
  headless: 'new',
  defaultViewport: false,
});

const page = await browser.newPage();
const start_timestamp = 1262304000
const end_timestamp = 1672444800

let stocks_price = [];
export const stocks = [
  'BBCA',
];

for (let i = 0; i < stocks.length; i++) {
  await page.goto(`https://finance.yahoo.com/quote/${stocks[i]}.JK/history?period1=${start_timestamp}&period2=${end_timestamp}&interval=1mo`, {timeout: 0, waitUntil: "networkidle2"});

  await scrollDown(page)

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

  const result = a.filter((element) => element!=null);
console.log(result)


}


await browser.close()