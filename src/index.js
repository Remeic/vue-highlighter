import Vue from "vue"

let originalContent = undefined


function selectPattern(word,liveHighlighting) {
  let result = ""
  if (!liveHighlighting) {
    result = "\\b(" + word + ")\\b"
  } else {
    result = "\\b(love)\\b"
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
    if (binding.arg == "word") {
      console.log(binding.arg)
      console.log(binding.value)
      word = binding.value
    }
    if (binding.arg == "live") {
      console.log(binding.arg)
      console.log(binding.value)
      pattern = selectPattern(word,binding.value)
    }

    el.innerHTML = highlight(originalContent, binding.value, pattern)

  },
  update(el, binding, vnode, oldVnode) {
    let pattern = ""
    if (binding.arg == "live") {
      console.log(binding.arg)
      console.log(binding.value)
      pattern = selectPattern(binding.value)
    }
    el.innerHTML = highlight(el.textContent, binding.value,pattern)
  },
  unbind(el, binding, vnode) {
    el.innerHTML = originalContent
  }
}

Vue.directive("highlight", vueHighlighter)

export default vueHighlighter
