"use strict";

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow } = require("actions-on-google");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

const stringHandler = require("./stringHandler");
const navigationHandler = require("./navigationHandler");

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

app.intent("navigation-intent", (conv, { navigation }) => {
  navigationHandler(conv, navigation);
});

app.intent("string-intent", (conv, { guitarString }) => {
  stringHandler(conv, guitarString);
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
