import { Editor, TinyMCE } from "tinymce";
import sideBar from "./core/sidebar/sidebar";
import registerEditorContentEvents from "./core/content/events";
import registerFormatter from "./core/sidebar/formatter";
import registerCommand from "./core/sidebar/command";
import { MERGE_FIELD_ICON } from "./core/sidebar/icons";

declare const tinymce: TinyMCE;

const setup = (editor: Editor): void => {
  editor.ui.registry.addIcon("merge-field", MERGE_FIELD_ICON);
  editor.ui.registry.addSidebar("merge-fields-sidebar", sideBar(editor));
  editor.on("init", () => {
    registerFormatter(editor);
    registerCommand(editor);
  });
  registerEditorContentEvents(editor);
};

export default (): void => {
  tinymce.PluginManager.add("merge-fields", setup);
};
