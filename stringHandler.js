const { strings, playString, getSuggestions } = require("./utils");

module.exports = (conv, guitarString) => {
  const string = strings.find((element) => element.name == guitarString);

  conv.contexts.set("current", 1, { guitarString: guitarString });

  conv.ask(playString(string));
  conv.ask(getSuggestions(string));
};
