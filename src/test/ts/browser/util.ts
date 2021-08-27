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

export const clickOnTreeElement = (editor: Editor, button: string): void => {
  const element = editor.$.find(
    `.tinymce-merge-fields button:contains(${button})`
  )[0];

  element.click();
};

export const getFieldHtml = (value: string, content: string): string => {
  return `<span class="merge-value" data-original-field-value="${encodeURI(
    value
  )}" contenteditable="false">
${content}
</span>`;
};
