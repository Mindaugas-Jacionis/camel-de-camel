import decamelize from "./";

describe("decamelize", () => {
  it("should return decamelized to snake case by default", () => {
    const input = {
      snakeCase: "snake Value",
      anotherCase: "another value",
      snakeObject: {
        nestedSnakeCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(decamelize(input)).toEqual({
      snake_case: "snake Value",
      another_case: "another value",
      snake_object: {
        nested_snake_case: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return decamelized to snake case when casing is 'snake'", () => {
    const input = {
      snakeCase: "snake Value",
      anotherCase: "another value",
      snakeObject: {
        nestedSnakeCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(decamelize(input, { casing: "snake" })).toEqual({
      snake_case: "snake Value",
      another_case: "another value",
      snake_object: {
        nested_snake_case: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return decamelized to upper snake case when casing is 'upper'", () => {
    const input = {
      snakeCase: "snake Value",
      anotherCase: "another value",
      snakeObject: {
        nestedSnakeCase: "nested snake value",
        word: "one word that becomes just uppercased",
      },
    };

    expect(decamelize(input, { casing: "upper" })).toEqual({
      SNAKE_CASE: "snake Value",
      ANOTHER_CASE: "another value",
      SNAKE_OBJECT: {
        NESTED_SNAKE_CASE: "nested snake value",
        WORD: "one word that becomes just uppercased",
      },
    });
  });

  it("should return decamelized to kebab case when casing is 'kebab'", () => {
    const input = {
      kebabCase: "snake Value",
      anotherKebabCase: "another value",
      kebabObject: {
        nestedKebabCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(decamelize(input, { casing: "kebab" })).toEqual({
      "kebab-case": "snake Value",
      "another-kebab-case": "another value",
      "kebab-object": {
        "nested-kebab-case": "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return decamelized to dot case when casing is 'dot'", () => {
    const input = {
      dotCase: "snake Value",
      anotherDotCase: "another value",
      dotObject: {
        nestedDotCase: "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    };

    expect(decamelize(input, { casing: "dot" })).toEqual({
      "dot.case": "snake Value",
      "another.dot.case": "another value",
      "dot.object": {
        "nested.dot.case": "nested snake value",
        word: "one word that SHOULDN'T change",
      },
    });
  });

  it("should return camelized pascal case", () => {
    const input = {
      pascalCase: "pascal Value",
      anotherPascalCase: "another value",
      pascalObject: {
        nestedPascalCase: "nested pascal value",
        word: "one word",
      },
    };

    expect(decamelize(input, { casing: "pascal" })).toEqual({
      PascalCase: "pascal Value",
      AnotherPascalCase: "another value",
      PascalObject: {
        NestedPascalCase: "nested pascal value",
        Word: "one word",
      },
    });
  });

  it("should handle Arrays and decamelize only objects in them", () => {
    expect(decamelize([{ firstCase: "first first", secondCase: "second value" }])).toEqual([
      { first_case: "first first", second_case: "second value" },
    ]);
    expect(
      decamelize([{ firstCase: "first first", secondCase: "second value" }], { casing: "snake" })
    ).toEqual([{ first_case: "first first", second_case: "second value" }]);
    expect(
      decamelize([{ firstCase: "first first", secondCase: "second value" }], { casing: "upper" })
    ).toEqual([{ FIRST_CASE: "first first", SECOND_CASE: "second value" }]);
    expect(
      decamelize([{ firstCase: "first first", secondCase: "second value" }], { casing: "dot" })
    ).toEqual([{ "first.case": "first first", "second.case": "second value" }]);
    expect(
      decamelize([{ firstCase: "first first", secondCase: "second value" }], { casing: "kebab" })
    ).toEqual([{ "first-case": "first first", "second-case": "second value" }]);
    expect(
      decamelize([{ firstCase: "first first", secondCase: "second value" }], { casing: "pascal" })
    ).toEqual([{ FirstCase: "first first", SecondCase: "second value" }]);

    expect(
      decamelize({
        simpleArray: [0, 1, true, false, undefined, null],
        snakeCase: [
          {
            firstCase: "first first",
            nestedCase: "nested value",
            arrayCase: [{ in_array_case: "in array case value" }, 1235],
          },
          "mixed content",
          [
            "array two",
            { arrayTwo: "array two value", anotherArrayTwoCase: "array two two case case" },
            false,
            undefined,
          ],
        ],
      })
    ).toEqual({
      simple_array: [0, 1, true, false, undefined, null],
      snake_case: [
        {
          first_case: "first first",
          nested_case: "nested value",
          array_case: [{ in_array_case: "in array case value" }, 1235],
        },
        "mixed content",
        [
          "array two",
          { array_two: "array two value", another_array_two_case: "array two two case case" },
          false,
          undefined,
        ],
      ],
    });
  });

  it("should not exclude mixed casing when excludeMixedCasing is not provided or false", () => {
    expect(decamelize({ "dot.Kebab_snake": "dot.Kebab_snake value" })).toEqual({
      "dot._kebab_snake": "dot.Kebab_snake value",
    });
    expect(
      decamelize({ "dot.Kebab_snake": "dot.Kebab_snake value" }, { excludeMixedCasing: false })
    ).toEqual({
      "dot._kebab_snake": "dot.Kebab_snake value",
    });
  });

  it("should exclude mixed casing when excludeMixedCasing is true", () => {
    expect(
      decamelize({ "dot.Kebab_snake": "dot.Kebab_snake value" }, { excludeMixedCasing: true })
    ).toEqual({
      "dot.Kebab_snake": "dot.Kebab_snake value",
    });
  });
});
