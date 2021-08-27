import { Editor, TinyMCE } from "tinymce";

import fieldRegex from "../../util/field-regex";
import {
  getMergeFields,
  getPrefix,
  getSuffix,
  MergeField,
} from "../../api/settings";
import buildMergeField from "./merge-field";

declare const tinymce: TinyMCE;

const mergeFieldHtml = (editor: Editor, field: MergeField) => {
  editor.fire("mergeFieldToHTML", {
    value: field.name,
    cleanValue: field.value,
  });
  return buildMergeField(editor, field);
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
  const tree = getMergeFields(editor);
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
      if (tree.valueExists(field)) {
        replacedText = replacedText.replace(
          field,
          mergeFieldHtml(editor, tree.findValue(field))
        );
      }
    });
    if (replacedText !== node.textContent) {
      editor.dom.replace(editor.dom.create("p", {}, replacedText), node);
    }
  });
};

export default stringToHtml;
