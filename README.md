# Stocks Price Scraping

### Scrap highest and lowest Indonesian public company stocks data in one year

> This project will scrap highest and lowest Indonesian public company stock data in one year. Scraped stocks data will be written in JSON file for ease of use of data.

## Tools

- Puppeteer
\
Change `headless: 'new'` to `headless: false` in `scraper.js` to see what happen in the background

## Usage

```sh
1. Run 'npm install'
2. Fill stocks and timestamp data in 'option.js' based on what stocks data you want to scrap and the time range
3. Run 'npm run start' 
4. Check 'stocks_price.json' file
```

For example, if we set the stocks are `BBCA` and `UNVR` from `1 Jan 2010` to `31 Dec 2022`.

Result in `stocks_price.json`

```json
[
	{
		"name": "BBCA",
		"data": [
			{
				"year": 2022,
				"highest": 9400,
				"lowest": 7000
			},
			{
				"year": 2021,
				"highest": 8250,
				"lowest": 5905
			},
			{
				"year": 2020,
				"highest": 7060,
				"lowest": 4325
			},
			{
				"year": 2019,
				"highest": 6800,
				"lowest": 5115
			},
			{
				"year": 2018,
				"highest": 5395,
				"lowest": 4120
			},
			{
				"year": 2017,
				"highest": 4550,
				"lowest": 2990
			},
			{
				"year": 2016,
				"highest": 3240,
				"lowest": 2525
			},
			{
				"year": 2015,
				"highest": 3120,
				"lowest": 2200
			},
			{
				"year": 2014,
				"highest": 2715,
				"lowest": 1850
			},
			{
				"year": 2013,
				"highest": 2500,
				"lowest": 1690
			},
			{
				"year": 2012,
				"highest": 1900,
				"lowest": 1350
			},
			{
				"year": 2011,
				"highest": 1770,
				"lowest": 1060
			},
			{
				"year": 2010,
				"highest": 1440,
				"lowest": 885
			}
		]
	},
	{
		"name": "UNVR",
		"data": [
			{
				"year": 2022,
				"highest": 5475,
				"lowest": 3280
			},
			{
				"year": 2021,
				"highest": 8000,
				"lowest": 3800
			},
			{
				"year": 2020,
				"highest": 8800,
				"lowest": 5275
			},
			{
				"year": 2019,
				"highest": 10105,
				"lowest": 8070
			},
			{
				"year": 2018,
				"highest": 11620,
				"lowest": 7780
			},
			{
				"year": 2017,
				"highest": 11195,
				"lowest": 7760
			},
			{
				"year": 2016,
				"highest": 9560,
				"lowest": 7060
			},
			{
				"year": 2015,
				"highest": 9200,
				"lowest": 6420
			},
			{
				"year": 2014,
				"highest": 6600,
				"lowest": 5160
			},
			{
				"year": 2013,
				"highest": 7470,
				"lowest": 4180
			},
			{
				"year": 2012,
				"highest": 5700,
				"lowest": 3500
			},
			{
				"year": 2011,
				"highest": 3800,
				"lowest": 2760
			},
			{
				"year": 2010,
				"highest": 3840,
				"lowest": 2110
			}
		]
	}
]
```

## Disclaimer 
**This project is for learning purpose only**

## Author
**Jefry Antonius Karlia**

- Github : [raptorz12](https://github.com/raptorz12)
- LinkedIn : [Jefry Antonius Karlia](https://linkedin.com/in/jefry-antonius-karlia)
- Medium : [@raptorz12](https://medium.com/@raptorz12)