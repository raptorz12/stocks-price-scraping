
import fs from "fs"
import { allStocksData } from "./scraper.js";

//Call the scraper to get all stocks data and save it into JSON file
fs.writeFile('./stocks_price.json', JSON.stringify(allStocksData, null, "\t") , err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Stocks data written successfully.');
  }
});