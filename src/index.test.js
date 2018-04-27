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

  it('Wrong custom text color', () => {
    wrapper.setData({ 
      style: {
        color: 'e54%'
      } 
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Change color : wrong to correct', () => {
    wrapper.setData({
      style: {
        color: 'e54%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
    wrapper.setData({
      style: {
        color: '#ffddee'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#ffddee\">Hello</span> World</p>')
  })

  it('Change color : correct to wrong', () => {
    wrapper.setData({
      style: {
        color: '#ffddee'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#ffddee\">Hello</span> World</p>')
    wrapper.setData({
      style: {
        color: 'e54%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })
})


describe('Custom color of background', () => {
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
        bgColor: ''
      }
    }
  })

  it('Default color of background', () => {
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom color of background as hex', () => {
    wrapper.setData({
      style: {
        bgColor: '#000000'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#000000; color:#fff\">Hello</span> World</p>')
  })

  it('Custom color of background as word', () => {
    wrapper.setData({
      style: {
        bgColor: 'white'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:white; color:#fff\">Hello</span> World</p>')
  })

  it('Wrong custom background color', () => {
    wrapper.setData({
      style: {
        bgColor: 'e54%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Change color : wrong to correct', () => {
    wrapper.setData({
      style: {
        bgColor: 'e54%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
    wrapper.setData({
      style: {
        bgColor: '#ffddee'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#ffddee; color:#fff\">Hello</span> World</p>')
  })

  it('Change color : correct to wrong', () => {
    wrapper.setData({
      style: {
        bgColor: '#ffddee'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#ffddee; color:#fff\">Hello</span> World</p>')
    wrapper.setData({
      style: {
        bgColor: 'e54%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })
})

describe('Custom Text and Background color', () => {
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
        color: '',
        bgColor: ''
      }
    }
  })

  it('Default color', () => {
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom color hex', () => {
    wrapper.setData({
      style: {
        color: '#111',
        bgColor: '#000000'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#000000; color:#111\">Hello</span> World</p>')
  })

  it('Custom color as word', () => {
    wrapper.setData({
      style: {
        color: 'white',
        bgColor: 'white'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:white; color:white\">Hello</span> World</p>')
  })

  it('Wrong custom background color', () => {
    wrapper.setData({
      style: {
        color: '#fee',
        bgColor: 'e54%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fee\">Hello</span> World</p>')
  })

  it('Wrong custom text color', () => {
    wrapper.setData({
      style: {
        color: '#e54%',
        bgColor: '#fee'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#fee; color:#fff\">Hello</span> World</p>')
  })
})

describe('Custom Padding', () => {
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
        padding: ''
      }
    }
  })

  it('Default padding', () => {
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom padding - 1 value', () => {
    wrapper.setData({
      style: {
        padding: '1px'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:1px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom padding - 2 value', () => {
    wrapper.setData({
      style: {
        padding: '1px 2px'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:1px 2px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom padding - 3 value', () => {
    wrapper.setData({
      style: {
        padding: '1px 2px 3px'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:1px 2px 3px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom padding - 4 value', () => {
    wrapper.setData({
      style: {
        padding: '1px 2px 3px 4px'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:1px 2px 3px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Wrong Padding', () => {
    wrapper.setData({
      style: {
        padding: 'ooo'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Custom Padding - %', () => {
    wrapper.setData({
      style: {
        padding: '5%'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:5%; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Change padding : wrong to correct', () => {
    wrapper.setData({
      style: {
        padding: 'ooo'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')
    wrapper.setData({
      style:{
        padding: '4rem'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:4rem; background-color:#009688; color:#fff\">Hello</span> World</p>')
  })

  it('Change padding : correct to wrong', () => {
    wrapper.setData({
      style: {
        padding: '4rem'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:4rem; background-color:#009688; color:#fff\">Hello</span> World</p>')

    wrapper.setData({
      style:{
        padding: 'ooo'
      }
    })
    expect(wrapper.html()).toBe('<p><span style=\"padding:0px 5px; background-color:#009688; color:#fff\">Hello</span> World</p>')

  })

})