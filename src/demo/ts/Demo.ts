import { TinyMCE } from "tinymce";

import Plugin from "../../main/ts/Plugin";

declare let tinymce: TinyMCE;

Plugin();

const sampleTree = [
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

tinymce.init({
  selector: "textarea.tinymce",
  plugins: "code merge-fields",
  toolbar: "merge-fields-sidebar",
  font_css: "sidebar.css",
  merge_fields: sampleTree,
  height: 500,
});
