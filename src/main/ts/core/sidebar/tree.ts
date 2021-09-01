import { helpShouldBeShownInModal, MergeField } from "../../api/settings";
import buildID from "../../util/build-id";
import { info_icon } from "./icons";
import { Editor } from "tinymce";

function help(editor: Editor, field: MergeField): string {
  if (!field.help) {
    return "";
  }
  if (helpShouldBeShownInModal(editor)) {
    return `
      <button type="button" class="info help-dialog cursor-pointer" data-help="${encodeURI(
        field.help
      )}" data-name="${encodeURI(field.name)}">
          <img src="data:image/svg+xml;base64,${btoa(
            info_icon
          )}" alt="info" width="24px" height="24px" />
      </button>
    `;
  }

  return `<span class="info tooltip">
        <img src="data:image/svg+xml;base64,${btoa(
          info_icon
        )}" alt="info" width="24px" height="24px" />
        <span class="tooltip-text">${field.help.replace(
          /(<([^>]+)>)/gi,
          ""
        )}</span>
  </span>`;
}

function branch(
  editor: Editor,
  limb: MergeField,
  level: number,
  isSearching: boolean
): string {
  return `
    <input type="checkbox" ${
      isSearching ? `checked="checked"` : ""
    }  id="${buildID("tinymce-merge-fields", editor.id, limb.name, level)}" />
    <label for="${buildID(
      "tinymce-merge-fields",
      editor.id,
      limb.name,
      level
    )}" class="tree__label cursor-pointer">${limb.name}</label>
    ${buildTree(editor, limb.items, level++, isSearching)}
  `;
}

function twig(limb: MergeField): string {
  return `<button
          type="button"
          class="tree__label cursor-pointer merge-field-button"
          data-value="${encodeURI(limb.value)}"
          data-help="${encodeURI(limb.help)}"
          data-name="${encodeURI(limb.name)}">
          ${limb.name}
          </button>
`;
}

function isBranch(limb: MergeField): boolean {
  return Array.isArray(limb.items) && limb.items.length > 0;
}

function trunk(
  editor: Editor,
  tree: MergeField[],
  level: number,
  isSearching: boolean
): string {
  return tree
    .map((limb) => {
      return `<li class="tree__item">${
        isBranch(limb) ? branch(editor, limb, level, isSearching) : twig(limb)
      }${limb.help ? help(editor, limb) : ""}</li>`;
    })
    .join("");
}

const buildTree = (
  editor: Editor,
  tree: MergeField[],
  level = 0,
  isSearching = false
): string => {
  return `
    <ul ${level === 0 && 'class="tree"'}>
        ${trunk(editor, tree, level, isSearching)}
    </ul>
  `;
};

export default buildTree;
