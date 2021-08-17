import { MergeField } from "../../api/settings";
import buildID from "../../util/build-id";
import { info_icon } from "./icons";

function help(text?: string): string {
  if (!text) {
    return "";
  }
  return `<span class="info tooltip">           
        <img src="data:image/svg+xml;base64,${btoa(
          info_icon
        )}" alt="info" width="24px" height="24px" />
        <span class="tooltip-text">${text}</span>
  </span>`;
}

function branch(limb: MergeField, level: number, isSearching: boolean): string {
  return `
    <input type="checkbox" ${
      isSearching ? `checked="checked"` : ""
    }  id="${buildID("tinymce-merge-fields", limb.name, level)}" />
    <label for="${buildID(
      "tinymce-merge-fields",
      limb.name,
      level
    )}" class="tree__label cursor-pointer">${limb.name}</label>
    ${buildTree(limb.items, level++, isSearching)}
  `;
}

function twig(limb: MergeField): string {
  return `<button
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
  tree: MergeField[],
  level: number,
  isSearching: boolean
): string {
  return tree
    .map((limb) => {
      return `<li class="tree__item">${
        isBranch(limb) ? branch(limb, level, isSearching) : twig(limb)
      }${limb.help ? help(limb.help) : ""}</li>`;
    })
    .join("");
}

const buildTree = (
  tree: MergeField[],
  level = 0,
  isSearching = false
): string => {
  return `
    <ul ${level === 0 && 'class="tree"'}>
        ${trunk(tree, level, isSearching)}
    </ul>
  `;
};

export default buildTree;
