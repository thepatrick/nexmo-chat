const express = require('express');
const uuid = require('uuid');

const { startVerify, checkVerify, sendSMS } = require('./helpers');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index', {}));

app.get('/verify', async (req, res) => {
  const { number } = req.query;
  try {
    const requestId = await startVerify(number, 'HackChat');
    res.render('verify', { requestId, number });
  } catch (e) {
    res.header('content-type', 'text/plain');
    res.send(`Error: ${e.message}`);
  }
});

app.get('/verified', async (req, res) => {
  const requestId = req.query.request_id;
  const { code, number } = req.query;

  try {
    await checkVerify(requestId, code);
    res.render('verified', { number });
  } catch (err) {
    res.render('verify', { requestId, err });
  }
});

app.get('/invite', async (req, res) => {
  const { number, call_number: callNumber } = req.query;
  const room = uuid.v4();

  try {
    await sendSMS(number, callNumber, `Time to video chat! http://localhost:3000/chat?room=${room}`, 'unicode');
    res.redirect(`/chat?room=${room}`);
  } catch (err) {
    res.render('verified', { number, err });
  }
});

const embedBase = `https://tokbox.com/embed/embed/ot-embed.js?embedId=${encodeURIComponent(process.env.EMBED_ID)}`;

app.get('/chat', (req, res) => {
  const { room } = req.query;
  res.render('chat', {
    src: `${embedBase}&room=${room}&iframe=true`,
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
