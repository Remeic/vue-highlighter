<template>
  <div id="app">
    <p v-highlight:word="'Alessandra'">I love Alessandra</p>
  </div>
</template>

<script>
import vueHighlighter from '../src/index'

export default {
  directive: {
    vueHighlighter
  }
}
</script>
