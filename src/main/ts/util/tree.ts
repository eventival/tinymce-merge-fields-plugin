import { MergeField } from "../api/settings";

class Tree {
  constructor(private tree: MergeField[]) {}

  findPath(value: string): string[] {
    const reduce = (result, object) => {
      if (object.value === value) {
        return [...result, object.name];
      }
      if (Array.isArray(object.items)) {
        const items = object.items.reduce(reduce, []);
        if (items.length > 0) {
          result = [object.name, ...items];
        }
      }
      return result;
    };

    return this.tree.reduce(reduce, []);
  }

  valueExists(value: string): boolean {
    return this.findPath(value).length > 0;
  }

  flatten(): MergeField[] {
    const reduce = (result, object): MergeField[] => {
      if (Array.isArray(object.items)) {
        const items = object.items.reduce(reduce, []);
        if (items.length > 0) result = [...result, ...items];
        delete object.items;
      }
      result = [...result, object];
      return result;
    };

    return this.getCopy().reduce(reduce, []);
  }

  public getCopy(): MergeField[] {
    const copy = (field: MergeField) => {
      if (Array.isArray(field.items) && field.items.length > 0) {
        return { ...field, items: field.items.map(copy) };
      }
      return { ...field };
    };
    return this.tree.map(copy);
  }

  findValue(value: string): MergeField {
    return this.flatten().find((field) => {
      return !!field.value && field.value === value;
    });
  }

  filter(fn: (item: MergeField) => boolean): MergeField[] {
    const reduce = (result: MergeField[], object: MergeField) => {
      if (fn(object)) {
        result.push(object);
        return result;
      }
      if (Array.isArray(object.items)) {
        const items = object.items.reduce(reduce, []);
        if (items.length) result.push({ ...object, items });
      }
      return result;
    };

    return this.tree.reduce(reduce, []);
  }

  getTree(): MergeField[] {
    return this.tree;
  }
}

export default Tree;
