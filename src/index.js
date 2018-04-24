import Vue from "vue"

let originalContent = undefined
const textColorDefault = '#fff'

function selectPattern(word, liveHighlighting = false) {
  let result = ""
  if (!liveHighlighting) {
    result = "\\b(" + word + ")\\b"
  } else {
    result = "(" + word + ")"
  }
  return result
}

function testColor(color = textColorDefault) {
  let result = textColorDefault
  let isAColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
  let isAString = /^[a-zA-Z]+$/.test(color)
  if(isAColor || isAString){
    result = color
  }
  return result
}

function highlight(content, word, color, patternSelected) {
  const spanStart =
    "<span style='padding:0px 5px; background-color:#009688; color:"+color+"'>"
  const spanEnd = "</span>"
  console.log(spanStart)
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
    let pattern = ''
    let word = ''
    let color = textColorDefault
    if (binding.value.word != undefined) {
      word = binding.value.word
    }
    if (binding.value.live != undefined) {
      pattern = selectPattern(word, binding.value.live)
    }
    if(binding.value.style != undefined) {
      color = testColor(binding.value.style.color)
      console.log(binding.value.style.color)
    }
    el.innerHTML = highlight(originalContent, word, color, pattern)

  },
  update(el, binding, vnode, oldVnode) {
    let pattern = ''
    let color = textColorDefault
    if (binding.value.style != undefined) {
      color = testColor(binding.value.style.color)
    }
    if (binding.value.live) {
      pattern = selectPattern(binding.value.word,binding.value.word)
      el.innerHTML = highlight(el.textContent, binding.value.word, color, pattern)
    }
    else{
      pattern = selectPattern(binding.value.word, binding.value.live)
      el.innerHTML = highlight(originalContent, binding.value.word, color, pattern)
    }    
  },
  unbind(el, binding, vnode) {
    el.innerHTML = originalContent
  }
}

Vue.directive("highlight", vueHighlighter)

export default vueHighlighter
