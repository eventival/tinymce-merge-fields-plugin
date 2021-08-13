import { assert } from "chai";
import searchTree from "../../../main/ts/util/search-tree";
import { MergeField } from "../../../main/ts/api/settings";

const exampleTree: MergeField[] = [
  {
    name: "item 1",
    value: "value 1",
    items: [
      {
        name: "item 11",
        value: "value 11",
      },
      {
        name: "item 12",
        value: "value 12",
      },
    ],
  },
  {
    name: "item 2",
    value: "value 2",
    items: [
      {
        name: "item 21",
        value: "value 21",
      },
      {
        name: "item 22",
        value: "value 22",
        items: [
          {
            name: "item 221",
            value: "value 221",
          },
          {
            name: "item 222",
            value: "value 222",
          },
        ],
      },
    ],
  },
  {
    name: "item 3",
    value: "value 1",
  },
];

describe("util.search-tree", () => {
  it("should return null when searching for not existed value", () => {
    assert.isUndefined(searchTree(exampleTree, "value x"));
  });
  it("should return correct value when searching on first level", () => {
    assert.deepEqual(searchTree(exampleTree, "value 2"), {
      name: "item 2",
      value: "value 2",
    });
  });
  it("should return correct value when searching on second level", () => {
    assert.deepEqual(searchTree(exampleTree, "value 12"), {
      name: "item 12",
      value: "value 12",
    });
  });
  it("should return correct value when searching on third level", () => {
    assert.deepEqual(searchTree(exampleTree, "value 222"), {
      name: "item 222",
      value: "value 222",
    });
  });
});
