import objectDeepKey from "./";

describe("objectDeepKey", () => {
  let values: Record<string, any>;

  beforeEach(() => {
    values = {
      id: "1",
      stuff: [1, 2, 3],
      methods: {
        id: "2",
        options: [
          { id: "123", type: "Friend" },
          { id: "224", type: "Foe" },
        ],
      },
    };
  });

  it("retrieves unnested value", () => {
    expect(objectDeepKey(values, "id").get()).toEqual("1");
  });

  it("retrieves deeply nested value", () => {
    expect(objectDeepKey(values, "methods.id").get()).toEqual("2");
  });

  it("retrieves array value", () => {
    expect(objectDeepKey(values, "stuff[2]").get()).toEqual(3);
  });

  it("retrieves deeply nested array value", () => {
    expect(objectDeepKey(values, "methods.options[1].id").get()).toEqual("224");
  });

  it("returns error if value is not found", () => {
    const key = "this.is.fake[0]";

    expect(() => {
      objectDeepKey(values, key).get();
    }).toThrow(`Property at path ${key} was not found`);
  });

  it("returns error if deep value is not found", () => {
    const key = "methods.is.fake[0]";

    expect(() => {
      objectDeepKey(values, key).get();
    }).toThrow(`Property at path ${key} was not found`);
  });

  it("detects unnested value", () => {
    expect(objectDeepKey(values, "id").has()).toBe(true);
  });

  it("detects deeply nested value", () => {
    expect(objectDeepKey(values, "methods.id").has()).toBe(true);
  });

  it("detects array value", () => {
    expect(objectDeepKey(values, "stuff[2]").has()).toBe(true);
  });

  it("detects deeply nested array value", () => {
    expect(objectDeepKey(values, "methods.options[1].id").has()).toBe(true);
  });

  it("returns false if the supplied key is not a property of the object", () => {
    expect(objectDeepKey(values, "this.is.fake[0]").has()).toBe(false);
  });

  it("sets unnested value", () => {
    objectDeepKey(values, "id").set("2");

    expect(values.id).toEqual("2");
  });

  it("sets nested value", () => {
    objectDeepKey(values, "methods.id").set("3");

    expect(values.methods.id).toEqual("3");
  });

  it("sets array value", () => {
    objectDeepKey(values, "stuff[2]").set(4);

    expect(values.stuff[2]).toEqual(4);
  });

  it("sets deeply nested array value", () => {
    objectDeepKey(values, "methods.options[1].id").set("444");

    expect(values.methods.options[1].id).toEqual("444");
  });

  it("sets nonexistent property in existing nested property", () => {
    const path = "methods.is.fake";

    objectDeepKey(values, path).set("123");

    expect(values.methods.is.fake).toEqual("123");
  });

  it("sets nonexistent property", () => {
    const path = "foo";

    objectDeepKey(values, path).set("123");

    expect(values.foo).toEqual("123");
  });

  it("sets nonexistent nested property", () => {
    const path = "foo.bar.baz.bop";

    objectDeepKey(values, path).set("123");

    expect(values.foo.bar.baz.bop).toEqual("123");
  });

  it("sets nonexistent property to existing property with array path", () => {
    const path = "methods.is.fake[0]";

    objectDeepKey(values, path).set("123");

    expect(values.methods.is.fake[0]).toEqual("123");
    expect(Array.isArray(values.methods.is.fake)).toEqual(true);
  });

  it("sets nonexistent property in nested property with array path", () => {
    const path = "foo.bar.baz[0].bop";

    objectDeepKey(values, path).set("123");

    expect(values.foo.bar.baz[0].bop).toEqual("123");
    expect(Array.isArray(values.foo.bar.baz)).toEqual(true);
  });

  it("sets a nonexistent array at non-zero index", () => {
    const path = "foo.bar.baz[2]";

    objectDeepKey(values, path).set("123");

    expect(values.foo.bar.baz).toEqual([undefined, undefined, "123"]);
    expect(Array.isArray(values.foo.bar.baz)).toEqual(true);
  });
});
