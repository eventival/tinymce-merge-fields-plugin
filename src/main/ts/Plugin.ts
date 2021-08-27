import { TinyMCE } from "tinymce";
import setup from "./setup";

declare const tinymce: TinyMCE;

export default (): void => {
  tinymce.PluginManager.add("merge-fields", setup);
};
