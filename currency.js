// https://api.privatbank.ua/p24api/exchange_rates?json&date=12.08.2019
const http = require('http');
const https = require('https');

let url = 'https://api.privatbank.ua/p24api/exchange_rates?json&date=';

http.createServer(async (req, res) => {
  // response favicon
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
  }

  let dates = getDates(6);
  let formatedDates = dates.map(fomatDate);
  let currencies = await getCurrencies(formatedDates);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(currencies));
    res.end();
}).listen(8080);

function getCurrencies(formatedDates) {
  let currencies = [];
  for(const date of formatedDates) {
    console.log(url + date);
    currencies.push(getData(url + date));
  }
  return Promise.all(currencies);
}


async function getData(url) {
  return new Promise((res, rej) => {
      https.get(url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        console.log('currencies recieved');
        res(data);
      });

    }).on("error", (err) => {
      rej("Error: " + err.message);
    });
  })
}

function getDates(countDays) {
  const res = [];
  while(countDays !== 0) {
    d = new Date();
    let pastDate = d.setDate(d.getDate() - countDays);
    res.push(new Date(pastDate));
    countDays--;
  }
  res.push(new Date());
  
  return res;
}

function fomatDate(date) {
  return new Date(date)
    .toISOString()
    .slice(0,10)
    .split('-')
    .reverse()
    .join('.')
}
