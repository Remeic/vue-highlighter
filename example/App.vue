<template>
  <div id="app">
    <p v-highlight="{ word: word, live: live }" >{{ text }}</p>
    <button @click="live = !live">Change Live value to {{!live}}</button>
  </div>
</template>

<script>
import vueHighlighter from '../src/index'

export default {
  data: ()=>{
    return {
      text: 'I love Alessandra Alessandrauno',
      word: 'Alessandra',
      live: false,
    }
  },
  directive: {
    vueHighlighter
  }
}
</script>
