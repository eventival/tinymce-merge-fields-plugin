import { Editor } from "tinymce";

export const MERGE_FIELD_FORMAT = "merge-field";

const registerFormatter = (editor: Editor): void => {
  editor.formatter.register(MERGE_FIELD_FORMAT, {
    inline: "span",
    styles: {
      backgroundColor: "#65b9dd",
      color: "#FFF",
      padding: "2px 8px",
      borderRadius: "3px",
      display: "inline-block",
    },
  });
};

export default registerFormatter;
