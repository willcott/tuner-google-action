const navigationHandler = require("../navigationHandler");

describe("navigationHandler", () => {
  it("plays previous string", () => {
    const ask = jest.fn();
    const setContexts = jest.fn();
    const getContexts = jest.fn(() => ({ parameters: { guitarString: "A" } }));

    const conv = { ask: ask, contexts: { set: setContexts, get: getContexts } };
    const navigation = "previous";

    navigationHandler(conv, navigation);

    expect(ask.mock.calls.length).toBe(2);

    expect(ask.mock.calls[0][0]).toBe(
      `<speak><audio src="https://tuner-online.com/audio/e2.mp3"><desc>Playing the Low E string.</desc></audio></speak>`
    );

    expect(ask.mock.calls[1][0].suggestions[0]).toEqual({
      title: "Play Again",
    });
    expect(ask.mock.calls[1][0].suggestions[1]).toEqual({ title: "Next" });
  });

  it("plays next string", () => {
    const ask = jest.fn();
    const setContexts = jest.fn();
    const getContexts = jest.fn(() => ({ parameters: { guitarString: "B" } }));

    const conv = { ask: ask, contexts: { set: setContexts, get: getContexts } };
    const navigation = "next";

    navigationHandler(conv, navigation);

    expect(ask.mock.calls.length).toBe(2);

    expect(ask.mock.calls[0][0]).toBe(
      `<speak><audio src="https://tuner-online.com/audio/e4.mp3"><desc>Playing the High E string.</desc></audio></speak>`
    );

    expect(ask.mock.calls[1][0].suggestions[0]).toEqual({
      title: "Previous",
    });
    expect(ask.mock.calls[1][0].suggestions[1]).toEqual({ title: "Play Again" });
  });

  it("says error message if there is no next", () => {
    const ask = jest.fn();
    const setContexts = jest.fn();
    const getContexts = jest.fn(() => ({ parameters: { guitarString: "High E" } }));

    const conv = { ask: ask, contexts: { set: setContexts, get: getContexts } };
    const navigation = "next";

    navigationHandler(conv, navigation);

    expect(ask.mock.calls.length).toBe(1);

    expect(ask.mock.calls[0][0]).toBe(
      "Cannot go any further forward, try again"
    );
  });

  it("says error message if there is no previous", () => {
    const ask = jest.fn();
    const setContexts = jest.fn();
    const getContexts = jest.fn(() => ({ parameters: { guitarString: "Low E" } }));

    const conv = { ask: ask, contexts: { set: setContexts, get: getContexts } };
    const navigation = "previous";

    navigationHandler(conv, navigation);

    expect(ask.mock.calls.length).toBe(1);

    expect(ask.mock.calls[0][0]).toBe(
      "Cannot go any further back, try again"
    );
  });
});
