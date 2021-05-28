const {
  isUserAvailable,
  addUser,
  getUsernameFromToken,
  refreshToken,
} = require("./users");

jest.mock("ioredis", () => require("ioredis-mock/jest"));

describe("Users", () => {
  let username = "TestUser";
  let token;

  // Allow date manipulation
  let dateNow = Date.now,
    offset = 0;
  const forwardDate = (seconds) => {
    offset += seconds;
    Date.now = () => dateNow() + offset * 1000;
  };
  beforeEach(() => {
    offset = 0;
    dateNow = Date.now;
  });
  afterEach(() => {
    Date.now = dateNow;
  });

  it("should not log in with invalid token", async () => {
    expect(await getUsernameFromToken("InvalidToken")).toBe(null);
  });

  it("should tell username is available", async () => {
    expect(await isUserAvailable(username)).toBe(true);
  });

  it("should not register invalid username", async () => {
    token = await addUser("X");
    expect(token).toBe(null);
  });

  it("should register", async () => {
    token = await addUser(username);
    expect(token).toBeDefined();
  });

  it("should tell username is not available anymore", async () => {
    expect(await isUserAvailable(username)).toBe(false);
  });

  it("should log in with valid token", async () => {
    expect(await getUsernameFromToken(token)).toEqual(username);
  });

  it("should expire in 10 seconds", async () => {
    forwardDate(10);
    expect(await getUsernameFromToken(token)).toBe(null);
    expect(await isUserAvailable(username)).toBe(true);
  });

  it("should allow refreshing token", async () => {
    token = await addUser(username);
    expect(token).toBeDefined();
    forwardDate(8);
    expect(await getUsernameFromToken(token)).toEqual(username);
    await refreshToken(token);
    forwardDate(8);
    expect(await getUsernameFromToken(token)).toEqual(username);
    forwardDate(3);
    expect(await getUsernameFromToken(token)).toEqual(null);
  });
});
