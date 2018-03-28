import { mount } from "@vue/test-utils"
import app from '../example/App'

test('it works', () => {
  const wrapper = mount(app)
  console.log(wrapper.html())
  wrapper.setData({text: "Alessandra Love"})
  console.log(wrapper.html())
})
