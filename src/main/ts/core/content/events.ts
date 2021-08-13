import { Editor } from "tinymce";
import stringToHtml from "./to-html-format";
import htmlToString from "./to-string-format";

const registerEditorContentEvents = (editor: Editor): void => {
  editor.on("nodechange", () => {
    stringToHtml(editor);
  });
  editor.on("keyup", () => {
    stringToHtml(editor);
  });
  editor.on("beforegetcontent", (event) => {
    return event.format === "raw" ? stringToHtml(editor) : htmlToString(editor);
  });
};

export default registerEditorContentEvents;
