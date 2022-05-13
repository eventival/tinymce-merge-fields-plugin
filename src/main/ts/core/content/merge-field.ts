import {
  getMergeFields,
  getSeparator,
  isStylingEnabled,
  MergeField,
} from "../../api/settings";
import { Editor } from "tinymce";

const getValue = (editor: Editor, field: MergeField): string => {
  const separator = getSeparator(editor);
  if (separator) {
    return getMergeFields(editor).findPath(field.value).join(` ${separator} `);
  }
  return field.name;
};

const buildMergeField = (editor: Editor, field: MergeField): string => {
  if (!isStylingEnabled(editor)) {
    return field.value;
  }
  return `<span class="merge-value" data-original-field-value="${encodeURI(
    field.value
  )}" contenteditable="false">
${getValue(editor, field)}
</span>`;
};

export default buildMergeField;
