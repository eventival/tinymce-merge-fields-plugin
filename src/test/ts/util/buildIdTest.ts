import { assert } from "chai";
import buildID from "../../../main/ts/util/build-id";

describe("util.build-id", () => {
  it("should return empty on empty input", () => {
    assert.equal(buildID(), "");
  });
  it("should return dash seperated string on spaced input", () => {
    assert.equal(buildID("one two"), "one-two");
  });
  it("should return dash seperated string on multiple arguments", () => {
    assert.equal(buildID("one", "two", 3), "one-two-3");
  });
  it("it should return a correct value on utf8 inputs", () => {
    assert.equal(buildID("à", "ā", 3), "a-a-3");
  });
});
