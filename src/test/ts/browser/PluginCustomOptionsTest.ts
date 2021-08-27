import { TinyHooks, TinyAssertions } from "@ephox/mcagar";
import Plugin from "./plugin";
import { Editor } from "tinymce";
import { clickOnTreeElement, getFieldHtml, openSideBar } from "./util";

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
      `<p>${getFieldHtml(fixtures[1]["items"][0].value, "Support email")}</p>`,
      { format: "raw" }
    );
  });
});
