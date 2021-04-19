const stringHandler = require("../stringHandler");

describe("stringHandler", () => {
  it("plays string Low E when asked", () => {
    const ask = jest.fn();
    const setContexts = jest.fn();

    const conv = { ask: ask, contexts: { set: setContexts } };
    const string = "Low E";

    stringHandler(conv, string);

    expect(ask.mock.calls.length).toBe(2);

    expect(ask.mock.calls[0][0]).toBe(
      `<speak><audio src="https://tuner-online.com/audio/e2.mp3"><desc>Playing the Low E string.</desc></audio></speak>`
    );

    expect(ask.mock.calls[1][0].suggestions[0]).toEqual({
      title: "Play Again",
    });
    expect(ask.mock.calls[1][0].suggestions[1]).toEqual({ title: "Next" });

    expect(setContexts).toBeCalledTimes(1);
    expect(setContexts).toBeCalledWith("current", 1, { guitarString: "Low E" })
  });

  it("plays string High E when asked", () => {
    const ask = jest.fn();
    const setContexts = jest.fn();

    const conv = { ask: ask, contexts: { set: setContexts } };
    const string = "High E";

    stringHandler(conv, string);

    expect(ask.mock.calls.length).toBe(2);

    expect(ask.mock.calls[0][0]).toBe(
      `<speak><audio src="https://tuner-online.com/audio/e4.mp3"><desc>Playing the High E string.</desc></audio></speak>`
    );

    expect(ask.mock.calls[1][0].suggestions[0]).toEqual({ title: "Previous" });
    expect(ask.mock.calls[1][0].suggestions[1]).toEqual({
      title: "Play Again",
    });

    expect(setContexts).toBeCalledTimes(1);
    expect(setContexts).toBeCalledWith("current", 1, { guitarString: "High E" })
  });
});
