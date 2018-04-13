import Vue from "vue"

let originalContent = undefined

function highlight(content, word) {
  const spanStart = "<span style='padding:0px 5px; background-color:#009688; color:white'>"
  const spanEnd = "</span>"
  let result = content
  if(word != ''){
    let pattern = "\\b(" + word + ")\\b"
    let regex = new RegExp(pattern, "g")
    result = content.replace(regex, spanStart + "$&" + spanEnd)
  }
  return result;
}

const vueHighlighter = {
  bind(el, binding, vnode) {
    originalContent = el.innerHTML
     if (binding.arg == "word") {
      el.innerHTML = highlight(originalContent, binding.value)
     }
  },
  update(el, binding, vnode, oldVnode){
    el.innerHTML = highlight(el.textContent, binding.value)
  },
  unbind(el, binding, vnode){
    el.innerHTML = originalContent
  },
}

Vue.directive("highlight", vueHighlighter)

export default vueHighlighter;