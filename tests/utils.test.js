const { playString, getSuggestions } = require("../utils");

describe("utils", () => {
  it("playString returns ssml to play string with description", () => {
    expect(playString({ name: "String Name", urlSuffix: "Url Suffix" })).toBe(
      `<speak><audio src="https://tuner-online.com/audio/Url Suffix"><desc>Playing the String Name string.</desc></audio></speak>`
    );
  });

  it("getSuggestions returns list of suggested commands", () => {
    expect(getSuggestions({ name: "A" })).toEqual({"suggestions": [{"title": "Previous"}, {"title": "Play Again"}, {"title": "Next"}]})

    expect(getSuggestions({ name: "Low E" })).toEqual({"suggestions": [{"title": "Play Again"}, {"title": "Next"}]})

    expect(getSuggestions({ name: "High E" })).toEqual({"suggestions": [{"title": "Previous"}, {"title": "Play Again"}]})
  });
});
