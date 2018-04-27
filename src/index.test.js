import { shallow, createLocalVue } from '@vue/test-utils'

import VueHighlighter from './index'
import { highlight } from './index'

describe('Plugin', () => {

  const Component = {
    template: '<p v-highlight="{ word: word, live: live }">Hello World</p>'
  }

  it('Add plugin', () => {
    const localVue = createLocalVue()
    localVue.use(VueHighlighter)
    expect(localVue.options.directives).toHaveProperty('highlight')
  })

  it('Add directive', () => {
    const wrapper = shallow(Component, {
      directives: {
        highlight
      },
      data: {
        word: '',
        live: false
      }
    })
    expect(wrapper.vm.$options.directives).toHaveProperty('highlight')
  })

})
