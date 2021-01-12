function parsePath(key: string): string[] {
  const separator = ".";
  return key.replace("[", separator).replace("]", "").split(separator);
}

function objectDeepKey<DeepObject extends Record<string, any> = {}>(
  object: DeepObject,
  key: string
) {
  if (object === Object.prototype)
    throw `Restricted modifying Object Prototype`;

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
    const path = parsePath(key);
    let current = object;

    for (let i = 0; i < path.length; i++) {
      const property = path[i];

      if (i === path.length - 1) {
        if (!/^\d+$/.test(property)) {
          Object.defineProperty(current, property, {
            configurable: true,
            enumerable: true,
            writable: true,
            value,
          });
        } else {
          //@ts-ignore
          current[property] = value;
        }
      } else {
        if (!current.hasOwnProperty(property)) {
          // @ts-ignore
          current[property] = !/^\d+$/.test(property) ? [] : {};
        }

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
