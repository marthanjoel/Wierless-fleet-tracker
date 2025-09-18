# Industrial Sensor Blueprint
### Twilio Functions scripts
The scripts located in this directory are meant to run on [Twilio Functions](https://www.twilio.com/functions).

### What is Functions?
Serverless architecture is a software design pattern where applications are hosted by a third-party service, eliminating the need for server software and hardware management by the developer. Applications are broken up into individual functions that can be invoked and scaled individually.

### What is Twilio Runtime?
Twilio Runtime is a suite designed to help you build, scale and operate your application, consisting of a plethora of tools including helper libraries, API keys, asset storage, debugging tools, and a node based serverless hosting environment [Twilio Functions](https://www.twilio.com/docs/api/runtime/functions).


#### (Bonus step) Enable voice dialer
In the [Fleet Tracker Blueprint](https://www.twilio.com/wireless/blueprints/fleet-tracker/), there is a required step to set up a [TwiML App](https://www.twilio.com/console/voice/runtime/twiml-apps). The TwiML app can be used to enable a browser-initiated voice call feature that is disabled in the front-end code. To enable the dialer feature, search for any commented out code (in the angular folder) dealing with mobile phone numbers and dialing. The final step is to upload (simpledialer.js)[simpledialer.js] to [Twilio Functions](https://www.twilio.com/docs/api/runtime/functions) and link the ***Voice input field*** in your [TwiML App](https://www.twilio.com/console/voice/runtime/twiml-apps) to your newly created Function, and finally, make sure you enter a valid number when you create a Fleet Tracker.

Full instructions for this tutorial can be found in the [Fleet Tracker Blueprint](https://www.twilio.com/wireless/blueprints/fleet-tracker/). Below you will find the minimum steps necessary to get this up and running.