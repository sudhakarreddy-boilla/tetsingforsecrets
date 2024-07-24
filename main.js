const express = require('express');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const Alexa = require('ask-sdk-core');

const app = express();

const skillBuilder = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    {
      canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
      },
      handle(handlerInput) {
        const speechText = 'Welcome to your Alexa skill!';
        return handlerInput.responseBuilder
          .speak(speechText)
          .getResponse();
      },
    }
    // Add more handlers here
  );

const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

app.post('/', adapter.getRequestHandlers());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));