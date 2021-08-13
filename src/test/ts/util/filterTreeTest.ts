import { assert } from "chai";
import filterTree from "../../../main/ts/util/filter-tree";

const exampleTree = [
  {
    name: "item 1",
    items: [
      {
        name: "item 11",
      },
      {
        name: "item 12",
      },
    ],
  },
  {
    name: "item 2",
    items: [
      {
        name: "item 21",
      },
      {
        name: "item 22",
        items: [
          {
            name: "item 221",
          },
          {
            name: "item 222",
          },
        ],
      },
    ],
  },
];

describe("util.filter-tree", () => {
  it("should return correct value when searching on first level", () => {
    assert.lengthOf(filterTree(exampleTree, "item 1"), 1);
    assert.deepEqual(filterTree(exampleTree, "item 1"), [exampleTree[0]]);
  });
  it("should return correct value when searching on second level", () => {
    assert.lengthOf(filterTree(exampleTree, "item 22"), 1);
    assert.deepEqual(filterTree(exampleTree, "item 22"), [
      {
        name: "item 2",
        items: [
          {
            name: "item 22",
            items: [
              {
                name: "item 221",
              },
              {
                name: "item 222",
              },
            ],
          },
        ],
      },
    ]);
  });
  it("should return correct value when searching on third level", () => {
    assert.lengthOf(filterTree(exampleTree, "item 222"), 1);
    assert.deepEqual(filterTree(exampleTree, "item 222"), [
      {
        name: "item 2",
        items: [
          {
            name: "item 22",
            items: [
              {
                name: "item 222",
              },
            ],
          },
        ],
      },
    ]);
  });
});
