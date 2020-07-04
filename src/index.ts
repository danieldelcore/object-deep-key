function parsePath(key: string): string[] {
  const separator = ".";
  return key.replace("[", separator).replace("]", "").split(separator);
}

function objectDeepKey<DeepObject extends Record<string, any> = {}>(
  object: DeepObject,
  key: string
) {
  const get = () => {
    if (!has()) {
      throw `Property at path ${key} was not found`;
    }

    return parsePath(key).reduce((obj, property) => obj[property], object);
  };

  const has = (): boolean => {
    const path = parsePath(key);
    let current = object;

    for (let i = 0; i < path.length; i++) {
      const property = path[i];

      if (!current || !current[property]) return false;
      if (i === path.length - 1) return true;

      current = current[property];
    }

    return false;
  };

  const set = (value: any): void => {
    if (!has()) {
      throw `Property at path ${key} was not found`;
    }

    const path = parsePath(key);
    let current = object;

    for (let i = 0; i < path.length; i++) {
      const property = path[i];

      if (i === path.length - 1) {
        //@ts-ignore
        current[property] = value;
      } else {
        current = current[property];
      }
    }
  };

  return {
    get,
    set,
    has,
  };
}

export default objectDeepKey;
