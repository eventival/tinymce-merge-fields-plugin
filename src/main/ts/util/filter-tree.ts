import { MergeField } from "../api/settings";

const filterTree = (array: MergeField[], text: string): MergeField[] => {
  const getNodes = (result: MergeField[], object: MergeField) => {
    if (object.name.toLowerCase().indexOf(text.toLowerCase()) >= 0) {
      result.push(object);
      return result;
    }
    if (Array.isArray(object.items)) {
      const items = object.items.reduce(getNodes, []);
      if (items.length) result.push({ ...object, items });
    }
    return result;
  };

  return array.reduce(getNodes, []);
};

export default filterTree;
