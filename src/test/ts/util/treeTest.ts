import { assert } from "chai";
import Tree from "../../../main/ts/util/tree";

describe("util.tree", () => {
  const fixtures = [
    {
      name: "User",
      items: [
        {
          value: "{{user.firstName}}",
          name: "First name",
          help: "Customer's first name",
        },
        {
          value: "{{user.lastName}}",
          name: "Last name",
          help: "Customer's last name",
        },
        {
          name: "Contact",
          items: [
            {
              value: "{{user.contact.twitter}}",
              name: "User twitter",
              help: "User profile twitter address",
            },
            {
              value: "{{user.contact.facebook}}",
              name: "User facebook",
              help: "User profile facebook address",
            },
          ],
        },
      ],
    },
    {
      name: "System",
      items: [
        {
          value: `{{system.supportEmail}}`,
          name: "Support email",
          help: "support email address as a link",
        },
        {
          value: "{{system.websiteLink}}",
          name: "Website link",
        },
      ],
    },
    {
      value: "{{UNSUBSCRIBE_LINK}}}",
      name: "Unsubscribe",
      help: "Unsubscribe link",
    },
  ];
  it("findPath should return empty when searching for not existing value", () => {
    const tree = new Tree(fixtures);
    assert.deepEqual(tree.findPath("{{not.exist}}"), []);
  });

  it("valueExists should return true when searching for existing value", () => {
    const tree = new Tree(fixtures);
    assert.equal(tree.valueExists("{{user.contact.twitter}}"), true);
  });

  it("valueExists should return false when searching for not existing value", () => {
    const tree = new Tree(fixtures);
    assert.equal(tree.findPath("{{not.exist}}"), false);
  });

  it("flatten should return flat the tree", () => {
    const tree = new Tree(fixtures);
    const flattenValue = [
      {
        value: "{{user.firstName}}",
        name: "First name",
        help: "Customer's first name",
      },
      {
        value: "{{user.lastName}}",
        name: "Last name",
        help: "Customer's last name",
      },
      {
        value: "{{user.contact.twitter}}",
        name: "User twitter",
        help: "User profile twitter address",
      },
      {
        value: "{{user.contact.facebook}}",
        name: "User facebook",
        help: "User profile facebook address",
      },
      { name: "Contact" },
      { name: "User" },
      {
        value: "{{system.supportEmail}}",
        name: "Support email",
        help: "support email address as a link",
      },
      { value: "{{system.websiteLink}}", name: "Website link" },
      { name: "System" },
      {
        value: "{{UNSUBSCRIBE_LINK}}}",
        name: "Unsubscribe",
        help: "Unsubscribe link",
      },
    ];
    assert.deepEqual(tree.flatten(), flattenValue);
  });

  it("getCopy should return a copy of tree and changing the copy should not change the original tree", () => {
    const tree = new Tree(fixtures);
    const copy = tree.getCopy();
    copy[0] = { name: "test" };
    assert.notDeepEqual(copy, tree.getTree());
  });

  it("filter should return an empty array when searching for not existing value", () => {
    const tree = new Tree(fixtures);
    assert.deepEqual(
      tree.filter((field) => {
        return field.value === "{{not.exist}}";
      }),
      []
    );
  });

  it("filter should return correct when searching for existing value", () => {
    const tree = new Tree(fixtures);
    assert.deepEqual(
      tree.filter((field) => {
        return field.value === "{{user.contact.twitter}}";
      }),
      [
        {
          name: "User",
          items: [
            {
              name: "Contact",
              items: [
                {
                  value: "{{user.contact.twitter}}",
                  name: "User twitter",
                  help: "User profile twitter address",
                },
              ],
            },
          ],
        },
      ]
    );
  });
});
