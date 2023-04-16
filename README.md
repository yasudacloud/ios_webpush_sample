# This is the repository where we have tested the operation of web push on iOS.

<video style="max-width: 500px;" src="https://user-images.githubusercontent.com/44352732/232321849-8a947c65-ccdc-4732-9c42-bd9b94f7660b.mp4" controls="controls" width="472" height="1020"></video>


### install

npm i

### Generate VAPID Key

./node_modules/.bin/web-push generate-vapid-keys

### Edit app.js

```javascript
// app.js Line 11,12
const vapidPublicKey = '[Public Key here]'
const vapidPrivateKey = '[Private Key here]'

// app.js Line 15   Your Email Address
webPush.setVapidDetails(
  'mailto:hoge@example.com',
  vapidPublicKey,
  vapidPrivateKey
);
```

### Set up a server

npm run start

### hint

Must be accessed via https to work on iOS.

You can also receive web pushes at http://localhost:3000 when opened from a PC browser.
