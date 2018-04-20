import Vue from "vue"

let originalContent = undefined


function selectPattern(word, liveHighlighting) {
  let result = ""
  if (!liveHighlighting) {
    result = "\\b(" + word + ")\\b"
  } else {
    result = "(" + word + ")"
  }
  return result
}

function highlight(content, word, patternSelected) {
  console.log(word)
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
    console.log("BIND")
    originalContent = el.innerHTML
    let pattern = ""
    let word = ""
    if (binding.value.word) {
      console.log(binding.value.word)
      word = binding.value.word
    } else {
      word = binding.value
    }
    if (binding.value.live) {
      console.log(binding.value.live)
      pattern = selectPattern(word, binding.value.live)
    }

    el.innerHTML = highlight(originalContent, word, pattern)

  },
  update(el, binding, vnode, oldVnode) {
    console.log('UPDATE')
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
