const express = require('express');
const webPush = require('web-push');

const app = express();
const port = 3000;

const vapidKeys = webPush.generateVAPIDKeys();
console.log('Public Key:', vapidKeys.publicKey);
console.log('Private Key:', vapidKeys.privateKey);

const vapidPublicKey = ''
const vapidPrivateKey = ''

webPush.setVapidDetails(
  'mailto:hoge@example.com',
  vapidPublicKey,
  vapidPrivateKey
);

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

const inMemoryVariable = []

app.get('/', (req, res) => {
  res.locals.vapidPrivateKey = vapidPublicKey
  res.render('index')
})

/**
 * Push通知の登録
 */
app.post('/api/subscribe', (req, res) => {
  const {subscription} = req.body
  console.log(req.body)
  console.log('@body')
  console.log(subscription)
  if (!inMemoryVariable.some(variable => variable.endpoint === subscription.endpoint)) {
    inMemoryVariable.push(subscription)
  }
  res.json({})
})

app.get('/api/public_key', (req, res) => {
  res.json({
    vapidPublicKey
  })
})

/**
 * 10秒後にPush通知の送信
 */
app.post('/api/notification', async (req, res) => {
  setTimeout(async () => {
    for (const subscription of inMemoryVariable) {
      try {
        await webPush.sendNotification(subscription, JSON.stringify({text: "hello!"}))
      } catch (e) {
        console.log(e)
      }
    }
  }, 5000)
  res.status(200).send({});
});

app.listen(port, () => {
  console.log(`listening ${port}`);
});
