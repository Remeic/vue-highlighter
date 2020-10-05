import highlight from './highlighter'

const Plugin = {
  install(Vue, options) {
    Vue.directive('highlight', highlight)
  }
}

export default Plugin

// Install by default
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
