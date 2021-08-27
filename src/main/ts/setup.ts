import { Editor } from "tinymce";
import { MERGE_FIELD_ICON } from "./core/sidebar/icons";
import sideBar from "./core/sidebar/sidebar";
import registerCommand from "./core/sidebar/command";
import registerEditorContentEvents from "./core/content/events";

const setup = (editor: Editor): void => {
  editor.ui.registry.addIcon("merge-field", MERGE_FIELD_ICON);
  editor.ui.registry.addSidebar("merge-fields-sidebar", sideBar(editor));
  editor.on("init", () => {
    registerCommand(editor);
  });
  registerEditorContentEvents(editor);
};

export default setup;
