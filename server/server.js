const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, './data.json'));
const middlewares = jsonServer.defaults();
const dataPath = path.resolve(__dirname, './data.json');
const AppService = require('./service');
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.get('/', (req, res, next) => res.send('Hello world!'));

server.get('/data', async (req , res, next) => {
  const data = await AppService.getResults(null);
  const results = Object.values(data).reduce((result, item) => {
    const obj = {};
    const key = Object.keys(item)[0];
    obj[key] = item[key];
    return Object.assign({}, result, obj);
  }, {});
  res.json(results);
});

server.post('/result/add', async (req, res, next) => {
  try {
    const { value, extra, date } = req.body;
    if (!value || !extra || !date) {
      const err = new Error(400);
      err.msg = 'Bad request.';
      throw err;
    }

    const postData = {};
    postData[date] = { value, extra };
    const addResponse = await AppService.addResult(postData);
    res.json({ date, value, extra });
  } catch(err) {
    console.log('err: ', err);
    res.json({ err: err.msg || 'Something went wrong!' });
  }
});

server.use(router);
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('JSON Server is running')
});
