import { Editor, TinyMCE } from "tinymce";
declare const tinymce: TinyMCE;

const htmlToString = (editor: Editor): void => {
  tinymce.walk(
    editor.getBody(),
    function (node) {
      if (node.nodeType == 1) {
        if (node.getAttribute("data-original-field-value") !== null) {
          editor.dom.replace(
            editor.dom.create(
              "span",
              {},
              decodeURI(node.getAttribute("data-original-field-value"))
            ),
            node
          );
        }
      }
    },
    "childNodes"
  );
};

export default htmlToString;
