import { MergeField } from "../api/settings";

const flattenTree = (tree: MergeField[]): MergeField[] => {
  const reduce = (result, object) => {
    if (Array.isArray(object.items)) {
      const items = object.items.reduce(reduce, []);
      if (items.length > 0) result = [...result, ...items];
      delete object.items;
    }
    result = [...result, object];
    return result;
  };

  return tree.reduce(reduce, []);
};

const searchTree = (tree: MergeField[], value: string): MergeField => {
  return flattenTree(JSON.parse(JSON.stringify(tree))).find((field) => {
    return !!field.value && field.value === value;
  });
};

export default searchTree;
