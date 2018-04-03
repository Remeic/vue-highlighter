import { shallow, createLocalVue } from "@vue/test-utils"
import app from '../example/App'

import vueHighlighter from '.';

test('it works', () => {

  const Component = {
    template: '<p v-highlight:word="word">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight',  vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: ''
    },
  })
  
  expect(wrapper.html()).toBe('<p>Hello World</p>')
  wrapper.setData({word: "World"})
  expect(wrapper.html()).toBe(
    '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:white\">World</span></p>'
  )
  wrapper.setData({word: "Hello"})
  expect(wrapper.html()).toBe(
    '<p><span style="padding:0px 5px; background-color:#009688; color:white">Hello</span> World</p>'
  )
  wrapper.setData({word: "Everyone"})
  expect(wrapper.html()).toBe('<p>Hello World</p>')
})
