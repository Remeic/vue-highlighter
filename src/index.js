import Vue from "vue"

let originalContent = undefined
const textColorDefault = '#fff'
const bgColorDefault = '#009688'

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

function highlight(content, word, color, bgColor, patternSelected) {
  const spanStart =
    "<span style='padding:0px 5px; background-color:"+bgColor+"; color:"+color+"'>"
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
    if (binding.value.word != undefined) {
      word = binding.value.word
    }
    if (binding.value.live != undefined) {
      pattern = selectPattern(word, binding.value.live)
    }
    if(binding.value.style != undefined) {
      color = testTextColor(binding.value.style.color)
    }
    if(binding.value.style != undefined) {
      bgColor = testBgColor(binding.value.style.bgColor)
    }
    el.innerHTML = highlight(originalContent, word, color, bgColor, pattern)

  },
  update(el, binding, vnode, oldVnode) {
    let pattern = ''
    let color = textColorDefault
    let bgColor = bgColorDefault
    if (binding.value.style != undefined) {
      color = testTextColor(binding.value.style.color)
    }
    if (binding.value.style != undefined) {
      bgColor = testBgColor(binding.value.style.bgColor)
    }
    if (binding.value.live) {
      pattern = selectPattern(binding.value.word,binding.value.word)
      el.innerHTML = highlight(el.textContent, binding.value.word, color, bgColor, pattern)
    }
    else{
      pattern = selectPattern(binding.value.word, binding.value.live)
      el.innerHTML = highlight(originalContent, binding.value.word, color, bgColor, pattern)
    }    
  },
  unbind(el, binding, vnode) {
    el.innerHTML = originalContent
  }
}

Vue.directive("highlight", vueHighlighter)

export default vueHighlighter
