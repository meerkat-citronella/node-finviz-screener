const fetch = require("node-fetch");
const fs = require("fs");
const cheerio = require("cheerio");

const TICKERS_SELECTOR =
  "#screener-content#screener-content > table > tbody > tr:nth-child(4) > td > table > tbody > tr > td:nth-child(2)";
const PAGINATION_SELECTOR = ".screener_pagination";
const FINVIZ_URL_PREPEND = "https://finviz.com/";

const timer = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
};

const getFinvizScreen = async (finvizScreenerUrl, __tickers = null) => {
  // typeguard
  try {
    /(\/\/finviz.com\/screener.ashx)/.exec(finvizScreenerUrl)[0];
  } catch (err) {
    return "ERROR: invalid finviz screener URL. Please pass a valid link to a finviz screener.";
  }

  const res = await fetch(finvizScreenerUrl);
  const text = await res.text();
  const $ = cheerio.load(text);

  const syms = $(TICKERS_SELECTOR)
    .map(function (i, el) {
      if (i !== 0) return $(this).text(); // first row is header row ("Ticker")
    })
    .get();

  __tickers = __tickers ? __tickers.concat(syms) : syms;

  const pagination = $(PAGINATION_SELECTOR).children(); // all the other pages to go through
  const next = pagination.filter(function (i, el) {
    const text = $(this).text();
    return text === "next";
  });

  if (next.length > 0) {
    // if there is a 'next' page, go to it
    await timer(7); // too quick a pace on the requests causes the server to return a blank page with only "too many requests" on it
    return getFinvizScreen(FINVIZ_URL_PREPEND + next.attr("href"), __tickers);
  } else {
    return __tickers;
  }
};

module.exports = {
  getFinvizScreen,
};
