import { Editor, TinyMCE } from "tinymce";

import fieldRegex from "../../util/field-regex";
import {
  getMergeFields,
  getPrefix,
  getSuffix,
  MergeField,
} from "../../api/settings";
import searchTree from "../../util/search-tree";

declare const tinymce: TinyMCE;

const mergeFieldHtml = (editor: Editor, field: MergeField) => {
  editor.fire("variableToHTML", {
    value: field.name,
    cleanValue: field.value,
  });
  return `<span class="merge-value" data-original-field-value="${encodeURI(
    field.value
  )}" contenteditable="false">${field.name}</span>`;
};

const getMatchedFields = (editor: Editor, value: string): string[] => {
  const regex = fieldRegex(getPrefix(editor), getSuffix(editor));
  let result = [];
  let match = regex.exec(value);
  while (match !== null) {
    result = [...result, match[0]];
    match = regex.exec(value);
  }
  return result;
};

const stringToHtml = (editor: Editor): void => {
  const mergeFields = getMergeFields(editor);
  let nodes = [];

  tinymce.walk(
    editor.getBody(),
    function (node) {
      const regex = fieldRegex(getPrefix(editor), getSuffix(editor));
      if (
        node.nodeType == 1 &&
        node.textContent &&
        regex.test(node.textContent)
      ) {
        nodes = [...nodes, node];
      }
    },
    "childNodes"
  );

  nodes.forEach((node) => {
    let replacedText = node.textContent;
    getMatchedFields(editor, node.textContent).forEach((field) => {
      const mergeField: MergeField = searchTree(mergeFields, field);
      if (mergeField) {
        replacedText = replacedText.replace(
          field,
          mergeFieldHtml(editor, mergeField)
        );
      }
    });
    if (replacedText !== node.textContent) {
      editor.dom.replace(editor.dom.create("p", {}, replacedText), node);
    }
  });
};

export default stringToHtml;
