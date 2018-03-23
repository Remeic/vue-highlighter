import Vue from "vue"

let content = undefined

function highlight(word, el) {
  const span = "<span style='padding:0px 5px; background-color:red; color:black'>"
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
    content = el.innerHTML
     if (binding.arg == "word") {
      el.innerHTML = highlight(binding.value, el)
     }
  },
  update(el, binding, vnode){

  },
  unbind(el, binding, vnode){

  },
}

Vue.directive("highlight", vueHighlighter)
