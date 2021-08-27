import { TinyHooks, TinyAssertions } from "@ephox/mcagar";
import { assert } from "chai";
import Plugin from "./plugin";
import { Editor } from "tinymce";

import {
  clickOnTreeElement,
  getFieldHtml,
  openSideBar,
  setSearchValue,
} from "./util";

// This an example of a browser test of the editor.
describe("browser.PluginTestWithDefaults", () => {
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
  const hook = TinyHooks.bddSetup(
    {
      plugins: "merge-fields",
      toolbar: "merge-fields-sidebar",
      merge_fields: fixtures,
    },
    [Plugin],
    true
  );

  it("test sidebar should open when clicking on the toolbar button", () => {
    const editor = <Editor>hook.editor();
    openSideBar(editor);

    assert.equal(editor.$.find(`.tinymce-merge-fields .search`).length, 1);
    assert.equal(
      editor.$.find(`.tinymce-merge-fields li`).length,
      10,
      "We have 10 elements in the tree"
    );
  });

  it("test when searching for tree item name", () => {
    const editor = <Editor>hook.editor();
    openSideBar(editor);
    setSearchValue(editor, "User twitter");

    assert.equal(
      editor.$.find(`.tinymce-merge-fields li`).length,
      3,
      "Search result should have 3 elements"
    );
  });

  it("When clicking on tree item, It should add value to the editor content", () => {
    const editor = <Editor>hook.editor();
    openSideBar(editor);

    clickOnTreeElement(editor, "Support email");

    TinyAssertions.assertContent(editor, "<p>{{system.supportEmail}}</p>", {
      format: "html",
    });
    TinyAssertions.assertContent(
      editor,
      `<p>${getFieldHtml(
        fixtures[1]["items"][0].value,
        "System &gt; Support email"
      )}</p>`,
      { format: "raw" }
    );
  });
});
