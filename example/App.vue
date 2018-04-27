<template>
  <div id="app">
    <p v-highlight="{ word: word, live: live, style: style }" >{{ text }}</p>
    <fieldset
      style="border: none;">
      <label for="word">Search</label>
      <input
        v-model="word"
        :disabled="!live"
        type="text"
        name="word"
        placeholder="Your word here" >
      <br><br>
      <button @click="live = !live">Change Live value to <b>{{ !live }}</b></button>
    </fieldset>
  </div>
</template>

<script>
import { highlight } from '../src/index'

export default {
  directives: {
    highlight
  },
  data: () => {
    return {
      text: 'I love Alessandra AlessandraAmore',
      word: 'Alessandra',
      live: false,
      style: {
        color: 'white'
      }
    }
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

  p{
    padding-left:1rem;
  }

</style>
