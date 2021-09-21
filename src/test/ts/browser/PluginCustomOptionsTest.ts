import { TinyHooks, TinyAssertions, TinyUiActions } from "@ephox/mcagar";
import Plugin from "./plugin";
import { Editor } from "tinymce";
import { assert } from "chai";
import {
  clickOnHelpIcon,
  clickOnTreeElement,
  getCurrentDialogBody,
  getCurrentDialogTitle,
  getFieldHtml,
  openSideBar,
} from "./util";

// This an example of a browser test of the editor.
describe("browser.PluginTestWithCustomOptions", () => {
  const fixtures = [
    {
      name: "User",
      items: [
        {
          value: "|user.firstName|",
          name: "First name",
          help: "Customer's first name",
        },
        {
          value: "|user.lastName|",
          name: "Last name",
          help: "Customer's last name",
        },
        {
          name: "Contact",
          items: [
            {
              value: "|user.contact.twitter|",
              name: "User twitter",
              help: "User profile twitter address",
            },
            {
              value: "|user.contact.facebook|",
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
          value: `|system.supportEmail|`,
          name: "Support email",
          help: "support email address as a link",
        },
        {
          value: "|system.websiteLink|",
          name: "Website link",
        },
      ],
    },
    {
      value: "|UNSUBSCRIBE_LINK|",
      name: "Unsubscribe",
      help: "Unsubscribe link",
    },
  ];
  const editorWithoutSeparator = TinyHooks.bddSetup(
    {
      plugins: "merge-fields",
      toolbar: "merge-fields-sidebar",
      merge_fields: fixtures,
      merge_field_separator: null,
      merge_field_prefix: "|",
      merge_field_suffix: "|",
      merge_fields_show_help_in: "modal",
    },
    [Plugin],
    true
  );

  it("When merge_field_separator option is set to null, it should not add path when tree item clicked", () => {
    const editor = <Editor>editorWithoutSeparator.editor();
    openSideBar(editor);

    clickOnTreeElement(editor, "Support email");

    TinyAssertions.assertContent(editor, "<p>|system.supportEmail|</p>", {
      format: "html",
    });
    TinyAssertions.assertContent(
      editor,
      `<p><span>${getFieldHtml(
        fixtures[1]["items"][0].value,
        "Support email"
      )}</span></p>`,
      { format: "raw" }
    );
  });

  it("should show a modal with help content, When clicking on help icon and  its set to show the help in modal", async () => {
    const editor = <Editor>editorWithoutSeparator.editor();
    openSideBar(editor);

    clickOnHelpIcon(editor, "Support email");
    await TinyUiActions.pWaitForDialog(editor);

    assert.equal(getCurrentDialogTitle(editor), "Support email");
    assert.equal(
      getCurrentDialogBody(editor),
      "support email address as a link"
    );
  });
});
