import { Editor } from "tinymce";
import buildTree from "./tree";
import { getMergeFields } from "../../api/settings";
import { INSERT_MERGE_FIELD_COMMAND } from "./command";

function sidebarParentElement(editor: Editor) {
  return editor.$.find(`#tinymce-merge-fields-${editor.id}`)[0];
}

function searchFieldElement(editor: Editor) {
  return editor.$.find(`#tinymce-merge-fields-${editor.id} .search`)[0];
}

function treeElement(editor: Editor) {
  return editor.$.find(`#tinymce-merge-fields-${editor.id} .tree`)[0];
}

function removeTree(editor: Editor) {
  const mergeFieldsTree = treeElement(editor);
  if (mergeFieldsTree) {
    mergeFieldsTree.remove();
  }
}

function onSearch(editor: Editor) {
  return (event) => {
    const value = (<HTMLInputElement>event.target)?.value;
    const mergeFieldsParent = sidebarParentElement(editor);
    removeTree(editor);
    if (value === "" || value == null) {
      mergeFieldsParent.insertAdjacentHTML(
        "beforeend",
        buildTree(editor, getMergeFields(editor).getTree())
      );
      return;
    }
    mergeFieldsParent.insertAdjacentHTML(
      "beforeend",
      buildTree(
        editor,
        getMergeFields(editor).filter(
          (field) => field.name.toLowerCase().indexOf(value.toLowerCase()) >= 0
        ),
        0,
        true
      )
    );
  };
}

function bindMergeFieldEvents(editor: Editor) {
  sidebarParentElement(editor).addEventListener("click", (event) => {
    if (
      event.target.type === "button" &&
      event.target.classList.contains("merge-field-button")
    ) {
      editor.execCommand(INSERT_MERGE_FIELD_COMMAND, false, {
        value: decodeURI(event.target.dataset.value),
        help: decodeURI(event.target.dataset.help),
        name: decodeURI(event.target.dataset.name),
      });
    }
  });
}

const bindEvents = (editor: Editor): void => {
  searchFieldElement(editor).addEventListener("input", onSearch(editor));
  bindMergeFieldEvents(editor);
};

export default bindEvents;
