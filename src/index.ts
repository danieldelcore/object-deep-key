function parsePath(key: string): string[] {
    const separator = '.';

    return key
        .replace('[', separator)
        .replace(']', '')
        .split(separator);
}

function objectDeepKey(
    this: any,
    object:  Record<string, any>,
    key: string,
) {
    this.get = <T>(): T => {
        if (!this.has()) {
            throw `Property at path ${key} was not found`;
        }

        return parsePath(key)
            .reduce((obj, property) => obj[property], object) as T
    };

    this.has = (): boolean => {
        const path = parsePath(key);
        let current = object;

        for (let i = 0; i < path.length; i++) {
            const property = path[i];

            if (!current || !current[property]) {
                return false;
            }

            if (i === path.length - 1) {
                return true;
            }

            current = current[property];
        }

        return false;
    };

    this.set = (value: any): void => {
        if (!this.has()) {
            throw `Property at path ${key} was not found`;
        }

        const path = parsePath(key);
        let current = object;

        for (let i = 0; i < path.length; i++) {
            const property = path[i];

            if (i === path.length - 1) {
                current[property] = value;
            } else {
                current = current[property];
            }
        }
    };

    return this;
}

export default objectDeepKey;
