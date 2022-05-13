import { Editor } from "tinymce";
import Tree from "../util/tree";

export type MergeField = {
  name: string;
  help?: string;
  value?: string;
  path?: string;
  items?: MergeField[];
};

export const getMergeFields = (editor: Editor): Tree => {
  return new Tree(editor.getParam("merge_fields", []));
};
export const getPrefix = (editor: Editor): string =>
  editor.getParam("merge_field_prefix", "{{");
export const getSuffix = (editor: Editor): string =>
  editor.getParam("merge_field_suffix", "}}");

export const getSeparator = (editor: Editor): string =>
  editor.getParam("merge_field_separator", ">");

export const isStylingEnabled = (editor: Editor): string =>
  editor.getParam("merge_field_is_styling_enabled", true);

export const helpShouldBeShownInModal = (editor: Editor): boolean => {
  return editor.getParam("merge_fields_show_help_in", "tooltip") === "modal";
};
