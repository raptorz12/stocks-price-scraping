import fs from "fs"
import excelJS from "exceljs"
import { allStocksData } from "./scraper.js";

//Call the scraper to get all stocks data and save it into JSON file
fs.writeFile('./stocks_price.json', JSON.stringify(allStocksData, null, "\t") , err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Stocks data written successfully in JSON.');
  }
});

//Function to format the stocks data for excel export
const formatData = (stocksData) => {
  let formattedData = [];

  stocksData.forEach((stockData) => {
      stockData.data.forEach((stocks) => {
          formattedData.push({
              'stocks': stockData.name,
              'year': stocks.year,
              'highest': stocks.highest,
              'lowest': stocks.lowest,
          });
      });
  });

  return formattedData
}

//Call the scraper to get all stocks data and save it into XLSX file
const workbook = new excelJS.Workbook();
const worksheet = workbook.addWorksheet('Stocks');

worksheet.addRow(['Stocks', 'Year', 'Highest', 'Lowest']);
formatData(allStocksData).forEach(data => {
    const stocks = Object.values(data);
    worksheet.addRow(stocks);
});

workbook.xlsx.writeFile('./stocks_price.xlsx')
    .then(() => {
        console.log(`Stocks data written successfully in XLSX.`);
    })
    .catch(err => {
        console.err(err);
    });
