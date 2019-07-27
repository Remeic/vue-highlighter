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
    <br>
    <p v-highlight="{ word: selectedWorList, live: listLive, style: style }" >{{ text }}</p>
    <fieldset
      style="border: none;">
      <label for="word">Search</label>
      <ul>
        <li
          v-for="option in wordListOptions"
          :key="option.text">
          <input
            v-model="option.selected"
            type="checkbox">
          <label>{{ option.text }}</label>
        </li>
      </ul>
      <br><br>
      <button @click="listLive = !listLive">Change Live value to <b>{{ !listLive }}</b></button>
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
      wordList: [],
      wordListOptions: [
        {text: 'Alessandra', selected: true},
        {text: 'I love', selected: true},
        {text: 'Vue', selected: false},
        {text: 'Ale', selected: false}
      ],
      live: false,
      listLive: false,
      style: {
        color: 'white'
      }
    }
  },
  computed: {
    selectedWorList() {
      return this.wordListOptions.filter(w => (w.selected)).map(w => (w.text))
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
