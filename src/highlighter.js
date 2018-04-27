import Vue from "vue"

let originalContent = undefined
const textColorDefault = '#fff'
const bgColorDefault = '#009688'
const paddingDefault= '0px 5px'

function selectPattern(word, liveHighlighting = false) {
  let result = ""
  if (!liveHighlighting) {
    result = "\\b(" + word + ")\\b"
  } else {
    result = "(" + word + ")"
  }
  return result
}

function testTextColor(color = textColorDefault){
  let result = textColorDefault
  if(testColor(color)){
    result = color
  }
  return result
}

function testBgColor(color = bgColorDefault){
  let result = bgColorDefault
  if (testColor(color)) {
    result = color
  }
  return result
}

function testColor(color) {
  let result = false
  let isAColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color)
  let isAString = /^[a-zA-Z]+$/.test(color)
  if(isAColor || isAString){
    result = true
  }
  return result
}

function testPadding(padding) {
  let result = paddingDefault
  let isAValidValue = /^(\d+(cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|%)\s?){1,4}$/i.test(padding)
  if (isAValidValue) {
    result = padding
  }
  return result
}

function highlight(content, word, patternSelected, color, bgColor, padding) {
  const spanStart =
    "<span style='padding:" + padding + "; background-color:" + bgColor + "; color:" + color + ";'>"
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
    let pattern = ''
    let word = ''
    let color = textColorDefault
    let bgColor = bgColorDefault
    let padding = paddingDefault
    if (binding.value.word != undefined) {
      word = binding.value.word
    }
    if (binding.value.live != undefined) {
      pattern = selectPattern(word, binding.value.live)
    }
    if(binding.value.style != undefined) {
      color = testTextColor(binding.value.style.color)
      bgColor = testBgColor(binding.value.style.bgColor)
      padding = testPadding(binding.value.style.padding)
    }
    el.innerHTML = highlight(originalContent, word, pattern, color, bgColor, padding)

  },
  update(el, binding, vnode, oldVnode) {
    let pattern = ''
    let color = textColorDefault
    let bgColor = bgColorDefault
    let padding = paddingDefault
    if (binding.value.style != undefined) {
      color = testTextColor(binding.value.style.color)
      bgColor = testBgColor(binding.value.style.bgColor)
      padding = testPadding(binding.value.style.padding)
    }
    if (binding.value.live) {
      pattern = selectPattern(binding.value.word,binding.value.live)
      el.innerHTML = highlight(el.textContent, binding.value.word, pattern, color, bgColor, padding)
    }
    else{
      pattern = selectPattern(binding.value.word)
      el.innerHTML = highlight(originalContent, binding.value.word, pattern, color, bgColor, padding)
    }    
  },
  unbind(el, binding, vnode) {
    el.innerHTML = originalContent
  }
}

export default vueHighlighter