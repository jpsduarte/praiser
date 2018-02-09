const rewireProvidePlugin = require('react-app-rewire-provide-plugin')

module.exports = (config, env) => {
  config = rewireProvidePlugin(config, env, {
    '$': 'jquery',
	  'jQuery': 'jquery',
    'window.jQuery': 'jquery',
    Popper: ['popper.js', 'default']
  })

  return config
}
