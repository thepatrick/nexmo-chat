# nexmo-chat

This is a quick and dirty example that uses three Nexmo APIs from the RapidAPI platform, and then the OpenTok Embeds API to power the actual video chat.

## Before you begin

1. You'll need [nodejs](https://nodejs.org/)
2. Sign up for [RapidAPI](https://dashboard.rapidapi.com/login)
3. Subscribe to both [Nexmo Verify](https://rapidapi.com/nexmo/api/Nexmo%20Verify) and [Nexmo SMS Messaging API](https://rapidapi.com/nexmo/api/Nexmo%20SMS%20Messaging). Copy the `X-Mashape-Key`.
4. Sign up for a [Tokbox Developer Account](https://tokbox.com/account/user/signup) and create an [Video Chat Embed](https://tokbox.com/developer/embeds/) project. Make it as an iframe, and copy the embed ID. Allow it to load from `http://localhost:3000/` (WebRTC requires SSL unless you are using localhost, which is great for this demo)
5. `npm install` to install the dependenceis

## Starting the app

The `X-Mashape-Key` & embed ID? Put them in the command below to start up the app:

```bash
# export EMBED_ID=YOUR_TOKBOX_EMBED_ID MASHAPE_KEY=YOUR_RAPIDAPI_KEY npm start
```

Then open `http://localhost:3000/` in Chrome or Firefox.