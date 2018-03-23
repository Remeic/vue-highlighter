import Vue from "vue"

let originalContent = undefined

function highlight(content, word, el) {
  const span = "<span style='padding:0px 5px; background-color:#009688; color:white'>"
  const spanEnd = "</span>"
  let words = content.split(" ")
  for (let i = 0; i < words.length; i++) {
    if (words[i] == word) {
      words[i] = span + words[i] + spanEnd
    }
  }
  return words.join(" ")
}

export const vueHighlighter = {
  bind(el, binding, vnode) {
    originalContent = el.innerHTML
     if (binding.arg == "word") {
      el.innerHTML = highlight(originalContent, binding.value, el)
     }
  },
  update(el, binding, vnode, oldVnode){
    el.innerHTML = highlight(binding.value, el)
  },
  unbind(el, binding, vnode){
    el.innerHTML = originalContent
  },
}

Vue.directive("highlight", vueHighlighter)
