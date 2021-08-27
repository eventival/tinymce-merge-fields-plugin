import { Editor } from "tinymce";
import buildMergeField from "../content/merge-field";

export const INSERT_MERGE_FIELD_COMMAND = "InsertMergeField";

const registerCommand = (editor: Editor): void => {
  editor.addCommand(INSERT_MERGE_FIELD_COMMAND, (ui, field) => {
    editor.execCommand("mceInsertContent", ui, buildMergeField(editor, field));
  });
};

export default registerCommand;
