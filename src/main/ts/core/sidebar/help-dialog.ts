import { Editor } from "tinymce";

const showHelpDialog = (editor: Editor, name: string, help: string): void => {
  editor.windowManager.open({
    title: name,
    body: {
      type: "panel",
      items: [
        {
          type: "htmlpanel",
          html: help,
        },
      ],
    },
    buttons: [
      {
        type: "cancel",
        text: "Close",
      },
    ],
  });
};

export default showHelpDialog;
