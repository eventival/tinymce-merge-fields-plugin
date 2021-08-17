import { Editor, Ui } from "tinymce";
import { getMergeFields } from "../../api/settings";
import buildTree from "./tree";

const searchField = () => {
  return `
    <input type="text" class="search" placeholder="search"/>
  `;
};

const content = (api: Ui.Sidebar.SidebarInstanceApi, editor: Editor): void => {
  api.element().innerHTML = `
    <div class="tinymce-merge-fields" id="tinymce-merge-fields-${editor.id}">
        ${searchField()}
        ${buildTree(editor, getMergeFields(editor))}
    </div>
  `;
};

export default content;
