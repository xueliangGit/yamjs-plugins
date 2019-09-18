/*
 * @Author: xuxueliang
 * @Date: 2019-08-13 18:50:38
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-21 17:27:10
 */
const postcss = require('rollup-plugin-postcss')
const varsa = require('postcss-simple-vars')
const preset = require('postcss-preset-env')
const autoprefixer = require('autoprefixer')
const json = require('rollup-plugin-json')
const babel = require('rollup-plugin-babel')
const path = require('path')
const buble = require('rollup-plugin-buble')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const node = require('rollup-plugin-node-resolve')

// const flow = require('rollup-plugin-flow-no-whitespace')
const version = process.env.VERSION || require('../package.json').version
const yamConf = require('yamjs/package.json')
const weexVersion = true || process.env.WEEX_VERSION || require('../packages/weex-vue-framework/package.json').version
const featureFlags = {} || require('./feature-flags')

const banner =
  '/*!\n' +
  ` * Yam.js v${ yamConf.version }\n` +
  ` * (c) 2014-${ new Date().getFullYear() } xuxueliang\n` +
  ' * Released under the MIT License.\n' +
  `\n` +
  ` * this Components is builded by YAM-CLI - v${ version }\n` + // 要输出的注释内容\n` +
  ` * lastTime:${ new Date() }.\n` +
  ' */'

const weexFactoryPlugin = {
  intro () {
    return 'module.exports = function weexFactory (exports, document) {'
  },
  outro () {
    return '}'
  }
}

const aliases = require('./alias')
const resolve = p => {
  const base = p.split('/')[0]
  if (aliases[base]) {
    return path.resolve(aliases[base], p.slice(base.length + 1))
  } else {
    return path.resolve(__dirname, '../', p)
  }
}

const builds = {
  'prod-umd': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/yamComponet.min.js'),
    format: 'umd',
    env: 'production',
    moduleName: 'yamComponet',
    transpile: false,
    banner
  },
  'prod-cjs': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/yamComponet.common.min.js'),
    format: 'cjs',
    env: 'production',
    moduleName: 'yamComponet',
    transpile: false,
    banner
  },
  'prod-esm': {
    entry: resolve('src/index.js'),
    dest: resolve('dist/yamComponet.esm.min.js'),
    format: 'es',
    env: 'production',
    moduleName: 'yamComponet',
    transpile: false,
    banner
  }
}

function genConfig (name) {
  const opts = builds[name]
  const config = {
    input: opts.entry,
    external: opts.external,
    plugins: [
      postcss({
        include: ['**/*.styl'],
        plugins: [
          varsa(),
          preset(),
          autoprefixer()
        ]
      }),
      postcss({
        include: ['**/*.stylus'],
        inject: false,
        plugins: [
          varsa(),
          preset(),
          autoprefixer()
        ]
      }),
      babel({
        'plugins': [
          '@babel/plugin-external-helpers',
          ['@babel/plugin-proposal-decorators', { 'legacy': true }],
          [
            '@babel/plugin-transform-react-jsx',
            { 'pragma': 'Yam.__createElement', 'pragmaFrag': 'c' }
          ]
        ],
        runtimeHelpers: true,
        exclude: 'node_modules/**' // 只编译我们的源代码
      }),
      json(),
      cjs(),
      node(),
      alias(Object.assign({}, aliases, opts.alias))
    ].concat(opts.plugins || []),
    output: {
      file: opts.dest,
      format: opts.format,
      banner: opts.banner,
      name: opts.moduleName || 'Yam'
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version
  }
  // feature flags
  Object.keys(featureFlags).forEach(key => {
    vars[`process.env.${ key }`] = featureFlags[key]
  })
  // build-specific env
  if (opts.env) {
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env)
  }
  config.plugins.push(replace(vars))

  if (opts.transpile !== false) {
    config.plugins.push(buble())
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name
  })

  return config
}
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET)
} else {
  exports.getBuild = genConfig
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig)
}
