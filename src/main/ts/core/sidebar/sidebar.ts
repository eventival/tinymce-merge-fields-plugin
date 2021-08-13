import { Editor, Ui } from "tinymce";
import content from "./content";
import bindEvents from "./events";

const sidebar = (editor: Editor): Ui.Sidebar.SidebarSpec => {
  return {
    tooltip: "Merge Fields",
    icon: "merge-field",
    onShow: (api) => {
      content(api, editor);
      bindEvents(editor);
    },
  };
};

export default sidebar;
