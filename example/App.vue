<template>
  <div id="app">
    <p v-highlight:word="word" v-highlight:live="live" >{{ text }}</p>
    <button @click="live = !live">changhe</button>
  </div>
</template>

<script>
import vueHighlighter from '../src/index'

export default {
  data: ()=>{
    return {
      text: 'I love Alessandra Alessandrauno',
      word: 'Alessandra',
      live: true,
    }
  },
  directive: {
    vueHighlighter
  }
}
</script>
