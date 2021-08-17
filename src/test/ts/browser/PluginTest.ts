// import { TinyHooks, TinyUiActions } from "@ephox/mcagar";
//
// import Plugin from "../../../main/ts/Plugin";
// const sampleTree = [
//   {
//     name: "User",
//     items: [
//       {
//         value: "{{user.firstName}}",
//         name: "First name",
//         help: "Customer's first name",
//       },
//       {
//         value: "{{user.lastName}}",
//         name: "Last name",
//         help: "Customer's last name",
//       },
//       {
//         name: "Contact",
//         items: [
//           {
//             value: "{{user.contact.twitter}}",
//             name: "User twitter",
//             help: "User profile twitter address",
//           },
//           {
//             value: "{{user.contact.facebook}}",
//             name: "User facebook",
//             help: "User profile facebook address",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "System",
//     items: [
//       {
//         value: `{{system.supportEmail}}`,
//         name: "Support email",
//         help: "support email address as a link",
//       },
//       {
//         value: "{{system.websiteLink}}",
//         name: "Website link",
//       },
//     ],
//   },
//   {
//     value: "{{UNSUBSCRIBE_LINK}}}",
//     name: "Unsubscribe",
//     help: "Unsubscribe link",
//   },
// ];
// // This an example of a browser test of the editor.
// describe("browser.PluginTest", () => {
//   const hook = TinyHooks.bddSetup(
//     {
//       plugins: "code tinymce-merge-fields-plugin",
//       toolbar: "tinymce-merge-fields-plugin-sidebar",
//       merge_fields: sampleTree,
//     },
//     [Plugin]
//   );
//
//   it("test click on button", () => {
//     const editor = hook.editor();
//     console.log(editor);
//     TinyUiActions.clickOnToolbar(
//       editor,
//       'div[role="sidebar"] button:contains("Merge Fields")'
//     );
//
//     //TinyAssertions.assertContent(editor, '<p>content added from tinymce-merge-fields-plugin</p>');
//   });
// });
