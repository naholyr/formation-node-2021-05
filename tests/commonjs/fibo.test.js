const { fibo } = require("./fibo.js");

describe("fibo", () => {
  it("should compute fibo(5)", () => {
    expect(fibo(5)).toEqual(5);
  });

  it('should not compute fibo("toto")', () => {
    expect(fibo("toto")).toBeNaN();
  });
});
