import { Editor } from "tinymce";
import { TinyUiActions } from "@ephox/mcagar";

export const openSideBar = (editor: Editor): void => {
  TinyUiActions.clickOnToolbar(editor, "button[title='Merge Fields']");
  TinyUiActions.pWaitForUi(editor, ".tinymce-merge-fields");
};

export const setSearchValue = (editor: Editor, value: string): void => {
  const inputField = editor.$.find(`.tinymce-merge-fields .search`)[0];
  inputField.value = value;

  const event = document.createEvent("HTMLEvents");
  event.initEvent("input", true, true);
  inputField.dispatchEvent(event);
};

export const getTreeButton = (editor: Editor, button: string):HTMLButtonElement => {
  return editor.$.find(`.tinymce-merge-fields button:contains(${button})`)[0];
};

export const clickOnTreeElement = (editor: Editor, button: string): void => {
  getTreeButton(editor, button).click();
};

export const getCurrentDialogElement = (editor: Editor):HTMLDivElement => {
  return editor.$.find(".tox-dialog")[0];
};

export const getCurrentDialogTitle = (editor: Editor):string => {
  return getCurrentDialogElement(editor).querySelector(".tox-dialog__title")
    .innerHTML;
};

export const getCurrentDialogBody = (editor: Editor):string => {
  return getCurrentDialogElement(editor).querySelector(
    ".tox-dialog__body .tox-form__group"
  ).innerHTML;
};

export const clickOnHelpIcon = (editor: Editor, button: string): void => {
  const helpButton = getTreeButton(editor, button)
    .closest("li")
    .querySelector(".help-dialog");

  if (helpButton) {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("click", true, true);
    helpButton.dispatchEvent(event);
  }
};

export const getFieldHtml = (value: string, content: string): string => {
  return `<span class="merge-value" data-original-field-value="${encodeURI(
    value
  )}" contenteditable="false">
${content}
</span>`;
};
