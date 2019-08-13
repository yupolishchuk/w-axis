const http = require('http');
const mysql = require('promise-mysql');

http.createServer(async function (req, res) {
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end();
    console.log('favicon requested');
    return;
}

  let users = await getUsers();
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(users));
  res.end();
}).listen(8080);

async function getUsers() {
    const connection = await mysql.createConnection({
        user: '', 
        password: '',
        database: 'w-axis'
    });

    return await connection.query('select * from users limit 0, 20');
}


