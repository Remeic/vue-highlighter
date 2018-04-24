import { shallow, createLocalVue } from "@vue/test-utils"

import vueHighlighter from '.';
import sinon from 'sinon'

describe('Default Behaviour',() => {
  const Component = {
    template: '<p v-highlight="{ word: word, live: live }">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight', vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: '',
      live: false
    },
  })

  it('Empty word', () => {
    wrapper.setData({ word: '' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained word', () => {
    wrapper.setData({ word: 'World' })
    expect(wrapper.html()).toBe(
      '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:#fff\">World</span></p>'
    )
  })

  it('Not contained word', () => {
    wrapper.setData({ word: 'Giulio' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })
})

describe('Live Behaviour',() => {
  const Component = {
    template: '<p v-highlight="{ word: word, live: live }">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight', vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: '',
      live: true
    },
  })

  it('Empty word', () => {
    wrapper.setData({ word: '' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained word', () => {
    wrapper.setData({ word: 'World' })
    expect(wrapper.html()).toBe(
      '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:#fff\">World</span></p>'
    )
  })

  it('Not contained word', () => {
    wrapper.setData({ word: 'Giulio' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained substring', () => {
    wrapper.setData({ word: 'ell' })
    expect(wrapper.html()).toBe('<p>H<span style=\"padding:0px 5px; background-color:#009688; color:#fff\">ell</span>o World</p>')
  })

})

describe('Live Behaviour - False -> True', () => {
  const Component = {
    template: '<p v-highlight="{ word: word, live: live }">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight', vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: '',
      live: false
    },
  })

  beforeEach(() => {
    wrapper.setData({ live: false })
  })

  it('Empty word', () => {
    wrapper.setData({ word: '' })
    wrapper.setData({ live: true })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained word', () => {
    wrapper.setData({ word: 'World' })
    expect(wrapper.html()).toBe(
      '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:#fff\">World</span></p>'
    )
    wrapper.setData({ live: true })
    expect(wrapper.html()).toBe(
      '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:#fff\">World</span></p>'
    )
  })

  it('Not contained word', () => {
    wrapper.setData({ word: 'Giulio' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
    wrapper.setData({ live: true })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained substring', () => {
    wrapper.setData({ word: 'ell' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
    wrapper.setData({ live: true })
    expect(wrapper.html()).toBe('<p>H<span style=\"padding:0px 5px; background-color:#009688; color:#fff\">ell</span>o World</p>')
  })

})

describe('Live Behaviour - True -> False', () => {
  const Component = {
    template: '<p v-highlight="{ word: word, live: live }">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight', vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: '',
      live: true
    },
  })

  beforeEach(() => {
    wrapper.setData({ live: true })
  })

  it('Empty word', () => {
    wrapper.setData({ word: '' })
    wrapper.setData({ live: true })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained word', () => {
    wrapper.setData({ word: 'World' })
    expect(wrapper.html()).toBe(
      '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:#fff\">World</span></p>'
    )
    wrapper.setData({ live: false })
    expect(wrapper.html()).toBe(
      '<p>Hello <span style=\"padding:0px 5px; background-color:#009688; color:#fff\">World</span></p>'
    )
  })

  it('Not contained word', () => {
    wrapper.setData({ word: 'Giulio' })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
    wrapper.setData({ live: false })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

  it('Contained substring', () => {
    wrapper.setData({ word: 'ell' })
    expect(wrapper.html()).toBe('<p>H<span style=\"padding:0px 5px; background-color:#009688; color:#fff\">ell</span>o World</p>')
    wrapper.setData({ live: false })
    expect(wrapper.html()).toBe('<p>Hello World</p>')
  })

})

describe('Unbind Directive',() => {
  const Component = {
    template: '<p v-highlight="{ word: word, live: live }">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight', vueHighlighter)
  const spy = sinon.stub()

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: 'Hello',
      live: true
    },
    destroyed() {
      spy()
    }
  }).destroy()

  it('Method called on destroy', () => {
    expect(spy.calledOnce).toBe(true)
  })

})

describe('Custom color of text',() => {
  const Component = {
    template: '<p v-highlight="{ word: word, live: live, style: style }">Hello World</p>'
  }

  const localVue = createLocalVue()

  localVue.directive('highlight', vueHighlighter)

  const wrapper = shallow(Component, {
    localVue,
    data: {
      word: 'Hello',
      live: true,
      style: {
        color: ''
      }
    }
  })

  it('Default color of text', () => {
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom color of text as hex', () => {
    wrapper.setData({ 
      style: {
        color: '#000000'
      } 
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#000000\">Hello</span> World</p>')
  })

  it('Custom color of text as word', () => {
    wrapper.setData({ 
      style: {
        color: 'white'
      } 
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:white\">Hello</span> World</p>')
  })

  it('Wrong custom color', () => {
    wrapper.setData({ 
      style: {
        color: 'e54%'
      } 
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })
})