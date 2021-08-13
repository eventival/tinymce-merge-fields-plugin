import { Editor } from "tinymce";

export const INSERT_MERGE_FIELD_COMMAND = "InsertMergeField";

const registerCommand = (editor: Editor): void => {
  editor.addCommand(INSERT_MERGE_FIELD_COMMAND, (ui, field) => {
    editor.execCommand(
      "mceInsertContent",
      ui,
      `<span class="merge-value" data-original-field-value="${encodeURI(
        field.value
      )}" contenteditable="false">${field.name}</span>`
    );
  });
};

export default registerCommand;
