import { Editor } from "tinymce";

export type MergeField = {
  name: string;
  help?: string;
  value?: string;
  items?: MergeField[];
};

export const getMergeFields = (editor: Editor): MergeField[] =>
  editor.getParam("merge_fields", []);
export const getPrefix = (editor: Editor): string =>
  editor.getParam("merge_field_prefix", "{{");
export const getSuffix = (editor: Editor): string =>
  editor.getParam("merge_field_suffix", "}}");
