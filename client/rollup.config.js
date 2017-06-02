import path from 'path';

import buble from 'rollup-plugin-buble';
import cjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

import postcssImport from 'postcss-import';

const srcPath = path.join(__dirname, 'src');
const destPath = path.join(__dirname, 'dist');

const isProduction = process.env.NODE_ENV === 'production';

export default {
  entry: path.join(srcPath, 'index.js'),
  format: 'iife',
  dest: path.join(destPath, 'app.js'),
  plugins: [
    postcss({
      sourceMap: true,
      extract: path.join(destPath, 'app.css'),
      plugins: [
        postcssImport()
      ]
    }),
    buble(),
    cjs({
      exclude: 'node_modules/procces-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/react-router-dom/**',
        'node_modules/history/**',
        'node_modules/prop-types/**'
      ],
      namedExport: {
        'node_modules\history\createBrowserHistory.js': ['default']
      }
    }),
    resolve({
      browser: true,
      main: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    ...(isProduction ? [
      uglify()
    ] : [])
  ],
  sourceMap: true
};
