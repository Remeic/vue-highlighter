
import highlight from './highlighter'

const Plugin = {
  install(Vue, options) {
    Vue.directive('highlight', highlight)
  }
}

export default Plugin

export {
  highlight
}

// Install by default
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin)
}
