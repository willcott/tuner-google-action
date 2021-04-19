const { Suggestions } = require("actions-on-google");

const mainUrl = "https://tuner-online.com/audio/";

const strings = [
  { name: "Low E", urlSuffix: "e2.mp3" },
  { name: "A", urlSuffix: "a2.mp3" },
  { name: "D", urlSuffix: "d3.mp3" },
  { name: "G", urlSuffix: "g3.mp3" },
  { name: "B", urlSuffix: "b3.mp3" },
  { name: "High E", urlSuffix: "e4.mp3" },
];

const playString = (string) => {
  const fullUrl = mainUrl + string.urlSuffix;

  const ssml = `<speak><audio src="${fullUrl}"><desc>Playing the ${string.name} string.</desc></audio></speak>`;

  return ssml;
};

const getSuggestions = (string) => {
  if (string.name === "Low E") return new Suggestions(["Play Again", "Next"]);
  if (string.name === "High E")
    return new Suggestions(["Previous", "Play Again"]);
  return new Suggestions(["Previous", "Play Again", "Next"]);
};

module.exports = { strings, playString, getSuggestions };
