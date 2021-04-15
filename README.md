# camel-de-camel

Library intended to `camelize` or `decamelize` keys in objects.

## Installation

```shell
npm i camel-de-camel
```

Or if you're using `yarn`

```shell
yarn add camel-de-camel
```

## Alternative Usage

Altrnatively you can use `ES` module, which can be found under `/lib/esm` directory.  
Or you can use `umd` package by adding bellow `script` tag to your `html`, and then using global `CamelDeCamel` object to access `.camelize` and `.decamelize` methods.

```html
<script type="text/javascript" src="https://unpkg.com/camel-de-camel@1.0.0/umd/index.js"></script>
```

## Methods

Library provides you with two methods:

- `camelize` - takes `Object` or `Array` of `Object`s as input and outputs same data structure where each key in `Object`s is converted to `cammelCase` (no matter how deeply nested)
- `decamelize` - takes two arguments as input: 1. `Object` or `Array` of `Object`s 2. wanted case to convert to (one of these: `upper` | `snake`| `dot` | `kebab` | `pascal` - default is `snake`) as input and outputs same data structure where each key in `Object`s is converted to selected casing.

## Examples

**`camelize`**

```js
// input
camelize({
  snake_case: 'value',
  PascalCase: {
    "kebab-case": "value",
    "dot.case": "value",
  },
  UPPER_CASE: [
    "unchanged",
    { inner_HTML: "keys get fully camelized" }
  ]
})

// output of above camelize() call
{
  snakeCase: 'value',
  pascalCase: {
    kebabCase: "value",
    dotCase: "value",
  },
  upperCase: [
    "unchanged",
    { innerHtml: "keys get fully camelized" }
  ]
}
```

**`decamelize`**

```js
decamelize({ camelCase: "value" }); // output:  { camel_case: "value" }
decamelize({ camelCase: "value" }, "snake"); // output:  { camel_case: "value" }
decamelize({ camelCase: "value" }, "upper"); // output:  { CAMEL_CASE: "value" }
decamelize({ camelCase: "value" }, "dot"); // output:  { "camel.case": "value" }
decamelize({ camelCase: "value" }, "kebab"); // output:  { "camel-case": "value" }
decamelize({ camelCase: "value" }, "pascal"); // output:  { CamelCase: "value" }
```

## ⚠️ Warning ⚠️

Incorrect casing when using `decamelize`, i.e. keys like `"dot.Kebab_snake"` at the moment will be horribly modified. This particular example would become: `dot._kebab_snake` when casing is `snake`, and `dot..kebab_snake` when casing is `dot`, and so on. These keys are considered semantically incorrect. There is a plan to either ignore any keys that have multiple casings in them when `decamelize`'ing, or remove non alpha-numeric characters(except of selected casing). If you feel like contributing, please feel free to put in a PR and grab the [issue](https://github.com/Mindaugas-Jacionis/camel-de-camel/issues/3)
