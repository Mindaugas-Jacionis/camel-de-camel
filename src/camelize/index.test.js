import camelize from "./";

describe("camelize", () => {
  it("should return camelized snake case", () => {
    const input = {
      snake_case: "snake Value",
      another_case: "another value",
      snake_object: {
        camelCase: "camel Camel",
        nested_snake_case: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(camelize(input)).toEqual({
      snakeCase: "snake Value",
      anotherCase: "another value",
      snakeObject: {
        camelCase: "camel Camel",
        nestedSnakeCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return camelized kebab case", () => {
    const input = {
      "kebab-case": "snake Value",
      "another-kebab-case": "another value",
      "kebab-object": {
        camelCase: "camel Camel",
        "nested-kebab-case": "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(camelize(input)).toEqual({
      kebabCase: "snake Value",
      anotherKebabCase: "another value",
      kebabObject: {
        camelCase: "camel Camel",
        nestedKebabCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return camelized dot case", () => {
    const input = {
      "dot.case": "snake Value",
      "another.dot.case": "another value",
      "dot.object": {
        camelCase: "camel Camel",
        "nested.dot.case": "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(camelize(input)).toEqual({
      dotCase: "snake Value",
      anotherDotCase: "another value",
      dotObject: {
        camelCase: "camel Camel",
        nestedDotCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return camelized pascal case", () => {
    const input = {
      PascalCase: "snake Value",
      AnotherPascalCase: "another value",
      PascalObject: {
        camelCase: "camel Camel",
        NestedPascalCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(camelize(input)).toEqual({
      pascalCase: "snake Value",
      anotherPascalCase: "another value",
      pascalObject: {
        camelCase: "camel Camel",
        nestedPascalCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should handle Arrays by camelizing only objects in them", () => {
    expect(
      camelize([
        {
          camelCase: "camel camel",
          snake_case: "snake value",
          "kebab-case": "kebab value",
          "dot.case": "dot value",
        },
      ])
    ).toEqual([
      {
        camelCase: "camel camel",
        kebabCase: "kebab value",
        snakeCase: "snake value",
        dotCase: "dot value",
      },
    ]);
    expect(
      camelize({
        simple_array: [0, 1, true, false, undefined, null],
        snake_case: [
          {
            camelCase: "camel camel",
            nested_snake_case: "nested snake value",
            array_case: [{ in_array_case: "in array case value" }, 1235],
          },
          "mixed content",
          [
            "array two",
            { array_two: "array two value", "kebab-case": "array two kebab" },
            false,
            undefined,
          ],
        ],
      })
    ).toEqual({
      simpleArray: [0, 1, true, false, undefined, null],
      snakeCase: [
        {
          camelCase: "camel camel",
          nestedSnakeCase: "nested snake value",
          arrayCase: [{ inArrayCase: "in array case value" }, 1235],
        },
        "mixed content",
        [
          "array two",
          { arrayTwo: "array two value", kebabCase: "array two kebab" },
          false,
          undefined,
        ],
      ],
    });
  });
});
