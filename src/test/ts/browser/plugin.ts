import setup from "../../../main/ts/setup";
import tinymce from "tinymce/tinymce";

export default (): void => {
  tinymce.PluginManager.add("merge-fields", setup);
};
