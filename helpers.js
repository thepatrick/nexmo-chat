const fetch = require('make-fetch-happen');

async function startVerify(phoneNumber, brand) {
  const r = await fetch(`https://nexmo-nexmo-sms-verify-v1.p.mashape.com/send-verification-code?phoneNumber=${encodeURIComponent(phoneNumber)}&brand=${encodeURIComponent(brand)}`, {
    method: 'POST',
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY,
      'X-Mashape-Host': 'nexmo-nexmo-sms-verify-v1.p.mashape.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const body = await r.json();

  if (parseInt(body.status, 10) === 0) {
    return body.request_id;
  }

  throw new Error(body.error_text);
}

exports.startVerify = startVerify;

async function checkVerify(requestId, code) {
  const r = await fetch(`https://nexmo-nexmo-sms-verify-v1.p.mashape.com/check-verification-code?request_id=${encodeURIComponent(requestId)}&code=${encodeURIComponent(code)}`, {
    method: 'POST',
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY,
      'X-Mashape-Host': 'nexmo-nexmo-sms-verify-v1.p.mashape.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const { res } = await r.json();

  console.log(JSON.stringify(res, null, 2));

  if (parseInt(res.status, 10) === 0) {
    return true;
  }

  throw new Error(res.error_text);
}

exports.checkVerify = checkVerify;

async function sendSMS(from, to, text, messageType) {
  // const r =
  await fetch(`https://nexmo-nexmo-messaging-v1.p.mashape.com/send-sms?from=${from}&to=${to}&text=${text}&type=${messageType}`, {
    method: 'POST',
    headers: {
      'X-Mashape-Key': process.env.MASHAPE_KEY,
      'X-Mashape-Host': 'nexmo-nexmo-messaging-v1.p.mashape.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  // const res = await r.json();

  // console.log(JSON.stringify(res, null, 2));

  // if (parseInt(res.status, 10) === 0) {
  //   return true;
  // }

  // throw new Error(res.error_text);
}

exports.sendSMS = sendSMS;
