const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, './data.json'));
const middlewares = jsonServer.defaults();
const dataPath = './data.json';

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.get('/', (req, res, next) => res.send('Hello world!'));

server.get('/data', (req , res, next) => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  res.json(data);
});

server.post('/result/add', (req, res, next) => {
  const { value, extra, date } = req.body;
  if (!value || !extra || !date) {
    const err = new Error(400);
    err.message = 'Bad request';
    throw err;
  }

  const data = JSON.parse(fs.readFileSync('./data.json'));
  data[date] = { value, extra }
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.json({ date, value, extra });
});

server.use(router);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('JSON Server is running')
});
