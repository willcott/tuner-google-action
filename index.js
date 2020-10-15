"use strict";

// Import the Dialogflow module from the Actions on Google client library.
const { dialogflow, Suggestions } = require("actions-on-google");

// Import the firebase-functions package for deployment.
const functions = require("firebase-functions");

// Instantiate the Dialogflow client.
const app = dialogflow({ debug: true });

const mainUrl = "https://tuner-online.com/audio/";

const playString = (string) => {
  const fullUrl = mainUrl + string.urlSuffix;

  const ssml = `
	<speak>
  		<audio src="${fullUrl}">
    	<desc>Playing the ${string.name} string.</desc>
  		</audio>
  </speak>`;

  return ssml;
};

const getSuggestions = (string) => {
  if (string.name === "Low E") return new Suggestions(["Play Again", "Next"]);
  if (string.name === "High E")
    return new Suggestions(["Previous", "Play Again"]);
  return new Suggestions(["Previous", "Play Again", "Next"]);
};

const strings = [
  { name: "Low E", urlSuffix: "e2.mp3" },
  { name: "A", urlSuffix: "a2.mp3" },
  { name: "D", urlSuffix: "d3.mp3" },
  { name: "G", urlSuffix: "g3.mp3" },
  { name: "B", urlSuffix: "b3.mp3" },
  { name: "High E", urlSuffix: "e4.mp3" },
];

app.intent("navigation-intent", (conv, { navigation }) => {
  const current = conv.contexts.get("current");

  const currentString = current.parameters.guitarString;

  let stringIndex = strings.findIndex(
    (element) => element.name == currentString
  );

  if (navigation == "previous") {
    if (stringIndex != 0) stringIndex = stringIndex - 1;
    else {
      conv.ask("Cannot go any further back, try again");
      return;
    }
  }
  if (navigation == "next") {
    if (stringIndex != 5) stringIndex = stringIndex + 1;
    else {
      conv.ask("Cannot go any further forward, try again");
      return;
    }
  }

  const guitarString = strings[stringIndex];

  conv.contexts.set("current", 1, { guitarString: guitarString.name });

  conv.ask(playString(guitarString));
  conv.ask(getSuggestions(guitarString));
});

app.intent("Guitar String", (conv, { guitarString }) => {
  const string = strings.find((element) => element.name == guitarString);

  conv.contexts.set("current", 1, { guitarString: guitarString });

  conv.ask(playString(string));
  conv.ask(getSuggestions(guitarString));
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
