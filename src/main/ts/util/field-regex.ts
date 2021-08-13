const escapeRegex = (string: string): string => {
  return Array.from(string[Symbol.iterator]())
    .reduce((result, current) => {
      if ("^$\\.*+?()[]{}|".indexOf(current) !== -1) {
        result = [...result, "\\", current];
      }
      return result;
    }, [])
    .join("");
};

const fieldRegex = (prefix: string, suffix: string): RegExp => {
  return new RegExp(
    `${escapeRegex(prefix)}([a-zA-Z. _]*)?${escapeRegex(suffix)}`,
    "g"
  );
};

export default fieldRegex;
