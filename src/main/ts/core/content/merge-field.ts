import { MergeField } from "../../api/settings";

const buildMergeField = (field: MergeField): string => {
  return `<span class="merge-value" data-original-field-value="${encodeURI(
    field.value
  )}" contenteditable="false">${field.name}</span>`;
};

export default buildMergeField;
