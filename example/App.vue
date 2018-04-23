<template>
  <div id="app">
    <p style="padding-left:1rem;" v-highlight="{ word: word, live: live }" >{{ text }}</p>
    <fieldset style="border: none;">
      <label for="word">Search</label>
      <input :disabled="!live" type="text" name="word" placeholder="Your word here" v-model="word">
      <br><br>
      <button @click="live = !live">Change Live value to <b>{{ !live }}</b></button>
    </fieldset>
  </div>
</template>

<script>
import vueHighlighter from '../src/index'

export default {
  data: ()=>{
    return {
      text: 'I love Alessandra AlessandraAmore',
      word: 'Alessandra',
      live: false,
    }
  },
  directive: {
    vueHighlighter
  }
}
</script>

<style>
  button{
    color: white;
    background-color: #0288D1;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    border: none;
  }
  
  #app{
    margin-top: 4rem;
    margin-left: 1rem;
  }
</style>

