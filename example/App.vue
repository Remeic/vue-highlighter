<template>
  <div id="app">
    <p v-highlight:word="word">{{ text }}</p>
  </div>
</template>

<script>
import vueHighlighter from '../src/index'

export default {
  data: ()=>{
    return {
      text: 'I love Alessandra',
      word: 'Alessandra'
    }
  },
  directive: {
    vueHighlighter
  }
}
</script>
