import { shallow, createLocalVue } from "@vue/test-utils"
import app from '../example/App'

import vueHighlighter from '.';

test('it works', () => {

  const Component = {
    template: '<p v-highlight:word="word">Hello, World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight',  vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: ''
    },
  })
  console.log(wrapper.html());
  wrapper.setData({word: "World"})
  console.log(wrapper.html());
    
})
