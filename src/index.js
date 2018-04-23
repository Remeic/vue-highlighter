import Vue from "vue"

let originalContent = undefined


function selectPattern(word, liveHighlighting = false) {
  let result = ""
  if (!liveHighlighting) {
    result = "\\b(" + word + ")\\b"
  } else {
    result = "(" + word + ")"
  }
  return result
}

function highlight(content, word, patternSelected) {
  const spanStart =
    "<span style='padding:0px 5px; background-color:#009688; color:white'>"
  const spanEnd = "</span>"
  let result = content
  if (word != "") {
    let regex = new RegExp(patternSelected, "g")
    result = content.replace(regex, spanStart + "$&" + spanEnd)
  }
  return result
}

const vueHighlighter = {
  bind(el, binding, vnode) {
    originalContent = el.innerHTML
    let pattern = ""
    let word = ""
    if (binding.value.word != undefined) {
      word = binding.value.word
    }
    if (binding.value.live != undefined) {
      pattern = selectPattern(word, binding.value.live)
    }
    el.innerHTML = highlight(originalContent, word, pattern)

  },
  update(el, binding, vnode, oldVnode) {
    let pattern = ""
    if (binding.value.live) {
      pattern = selectPattern(binding.value.word,binding.value.word)
      el.innerHTML = highlight(el.textContent, binding.value.word, pattern)
    }
    else{
      pattern = selectPattern(binding.value.word, binding.value.live)
      el.innerHTML = highlight(originalContent, binding.value.word, pattern)
    }    
  },
  unbind(el, binding, vnode) {
    el.innerHTML = originalContent
  }
}

Vue.directive("highlight", vueHighlighter)

export default vueHighlighter
