import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import filesize from "rollup-plugin-filesize";

import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      {
        name: "CamelDeCamel",
        globals: { "camel-de-camel": "CamelDeCamel" },
        file: pkg.unpkg,
        format: "umd",
        sourcemap: true,
      },
      { file: pkg.main, sourcemap: true, format: "cjs" },
    ],
    plugins: [
      nodeResolve(),
      babel({ exclude: ["node_modules/**"], babelHelpers: "bundled" }),
      terser(),
      filesize(),
    ],
  },
];
