const path = require('path');
const fs = require('fs');

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/scss/style.scss',
    '~/assets/scss/common.scss',
    'bootstrap-css-only/css/bootstrap.min.css',
    'mdbvue/lib/css/mdb.min.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/i18n.js',
    '~/plugins/mdbootstrap.js',
    '~/plugins/component.js',
    '~/plugins/moment.js',
    {
      src: '~/plugins/common.js',
      mode: 'client'
    },
    {
      src: '~/plugins/fb.js',
      mode: 'client'
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      const alias = config.resolve.alias || {};
      const rootDir = this.buildContext.options.rootDir;
      const aliasList = [
        'assets',
        'components',
        'middleware',
        'pages',
        'layouts'
      ];
      let i;
      for(i in aliasList) {
        alias[`@${aliasList[i]}`] = path.join(rootDir, aliasList[i]);
      }
    },
    vendor: ['vue-i18n'],
    transpile: [
      'mdbvue/lib/components'
    ]
  },
  server: {
    port: '9507',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
    }
  },
  router: {
    middleware: 'i18n'
  },
  generate: {
    routes: ['/', '/en']
  }
}
