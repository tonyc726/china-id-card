import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';

const banner = `/* ${pkg.name} v${pkg.version} - ${pkg.author} */`;
export default {
  banner,
  input: 'src/index.js',
  plugins: [
    nodeResolve(),
    babel(),
    (process.env.NODE_ENV === 'production' && uglify({
      output: {
        // Preserve banner
        preamble: banner,
      },
    })),
  ],
  output: (process.env.NODE_ENV === 'production') ?
    {
      format: (process.env.TARGET === 'bowser') ? 'amd' : 'cjs',
      file: `dist/${(process.env.TARGET === 'bowser') ? 'index.amd' : 'index'}.min.js`,
      sourcemap: true,
    } : {
      format: (process.env.TARGET === 'bowser') ? 'amd' : 'cjs',
      file: `dist/${(process.env.TARGET === 'bowser') ? 'index.amd' : 'index'}.js`,
    },
};
