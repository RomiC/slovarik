import buble from 'rollup-plugin-buble';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  entry: './client/src/index.js',
  format: 'iife',
  dest: './client/dist/app.js',
  plugins: [
    buble(),
    cjs({
      exclude: 'node_modules/procces-es6/**',
      include: [
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**'
      ]
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
