# node-finviz-screener

Get results from a finviz screener url.

## Install

`$ npm install node-finviz-screener`

## Usage

```
const { getFinvizScreen } = require('node-finviz-screener')

getFinvizScreen(
	"https://finviz.co/screener.ashx?v=111f=cap_largeover,exch_nyse,sec_technology"
).then((res) =>  console.log(res));

// [
  'ACN',  'AI',   'ANET', 'APH',  'ASX',  'AVLR',
  'BILL', 'BKI',  'BR',   'CAJ',  'CDAY', 'CLVT',
  'CRM',  'DELL', 'DNB',  'DT',   'EPAM', 'ESTC',
  ...
]
```

## API

`getFinvizScreen( finvizScreenURL )`

### Parameters

`finvizScreenerURL`: required

Must be a valid link to a finviz screener. Go to `https://finviz.com/screener.ashx` to build your desired screen, then copy the URL and paste as argument. It's that easy.

### Return value

A `Promise` that resolves to an array of strings containing the tickers that pass the screen.

## License

MIT
