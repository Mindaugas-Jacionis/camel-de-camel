# camel-de-camel

Library intended to `camelize` or `decamelize` keys in objects.

## Motivation

A lot of times colaboration between frontend and backend differs in casing. It is common to use `camelCase` in JavaScript in frontend. While backend implementations commonly use `snake_case`. It is not uncommon for backend API response payloads to be remapped into `cammelCase` and vice-versa when sending frontend-to-backend requests.  
This library aims to provide seemless API requests interceptor that would cover casing for both ends.  
**camel-de-camle library can definetely be used outside of backend/frontend API communication context, but it is built with it in mind and therefore acconts only for JSON parsable data. I.e. things like regex are not accounted for.**

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
- `decamelize` - takes two arguments as input: 1. `Object` or `Array` of `Object`s 2. options `Object` that consist of: 1. `casing` - wanted case to convert to (one of these: `upper` | `snake`| `dot` | `kebab` | `pascal` - default is `snake`) 2. `excludeMixedCasing` - `Boolean` value that defaults to `false`, which allows to exclude non-alphanumeric keys from being converted to selected casing(as it would result in even more mixed casing). Function `decamelize` outputs same data structure where each key in `Object`s is converted to selected casing (mixed casing is either excluded or converted based on `excludeMixedCasing` option value).

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
decamelize({ camelCase: "value" }, { casing: "snake" }); // output: { camel_case: "value" }
decamelize({ camelCase: "value" }, { casing: "upper" }); // output: { CAMEL_CASE: "value" }
decamelize({ camelCase: "value" }, { casing: "dot" }); // output: { "camel.case": "value" }
decamelize({ camelCase: "value" }, { casing: "kebab" }); // output: { "camel-case": "value" }
decamelize({ camelCase: "value" }, { casing: "pascal" }); // output: { CamelCase: "value" }

// by default camelize does not exclude "mixed casing keys"
decamelize({ "dot.Kebab_snake": "value" }); // output: { "dot._kebab_snake": "value" }
decamelize({ "dot.Kebab_snake": "value" }, { casing: "snake" }); // output: { "dot._kebab_snake": "value" }
// adding excludeMixedCasing option as true will exclude any non-alphanumeric keys
decamelize({ "dot.Kebab_snake": "value" }, { casing: "snake", excludeMixedCasing: true }); // output: { "dot.Kebab_snake": "value" }
```

**example of axios request/response interceptors (axios has to be added to the project separetely)**

```js
// will convert to snake case without mixed casing exclusion
axios.interceptors.request.use((requestObject) => {
  const decamelizedData = decamelize(requestObject.data);

  return { ...requestObject, data: decamelizedData };
});

// will intercept response data and convert to camelCase
axios.interceptors.response.use((responseObject) => {
  const camelizedData = camelize(responseObject.data);

  return { ...responseObject, data: camelizedData };
});
```
