const { strings, playString, getSuggestions } = require("./utils");

module.exports = (conv, navigation) => {
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
};
