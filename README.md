# vue-highlighter

[![NPM version](https://img.shields.io/npm/v/vue-highlighter.svg?style=flat)](https://npmjs.com/package/vue-highlighter) [![NPM downloads](https://img.shields.io/npm/dm/vue-highlighter.svg?style=flat)](https://npmjs.com/package/vue-highlighter) [![CircleCI](https://circleci.com/gh/remeic/vue-highlighter/tree/master.svg?style=shield)](https://circleci.com/gh/remeic/vue-highlighter/tree/master)

Vue component for highlight multiple istances of a word

## Install

```bash
yarn add vue-highlighter
```

CDN: [UNPKG](https://unpkg.com/vue-highlighter/) | [jsDelivr](https://cdn.jsdelivr.net/npm/vue-highlighter/) (available as `window.vueHighlighter`)

## Usage

```vue
<template>
  <p v-highlight:word="'Alessandra'">I love Alessandra</p>
</template>

<script>
import vueHighlighter from 'vue-highlighter'

export default {
  directives: {
    vueHighlighter
  }
}
</script>
```

## License

MIT &copy; [Giulio Fagioli](https://github.com/remeic)
