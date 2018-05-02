# vue-highlighter

[![NPM version](https://img.shields.io/npm/v/vue-highlighter.svg?style=flat)](https://npmjs.com/package/vue-highlighter) [![NPM downloads](https://img.shields.io/npm/dm/vue-highlighter.svg?style=flat)](https://npmjs.com/package/vue-highlighter) [![Build Status](https://travis-ci.org/Remeic/vue-highlighter.svg?branch=master)](https://travis-ci.org/Remeic/vue-highlighter)
[![codecov](https://codecov.io/gh/Remeic/vue-highlighter/branch/master/graph/badge.svg)](https://codecov.io/gh/Remeic/vue-highlighter)

Vue directive for highlight multiple istances of a word

![Example](https://media.giphy.com/media/YU7J5r4WfnLO0geruD/giphy.gif)

## Install

```bash
yarn add vue-highlighter
```

CDN: [UNPKG](https://unpkg.com/vue-highlighter/) | [jsDelivr](https://cdn.jsdelivr.net/npm/vue-highlighter/) (available as `window.vueHighlighter`)

## Usage

***

### Version 1.1.2 (**Deprecated**)
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

***

### Version 2.1.2 ( and >= )
```vue
<template>
  <p v-highlight="{ word: word, live: live }" >{{ text }}</p>
</template>

<script>
import vueHighlighter from 'vue-highlighter'

export default {
  data: () => {
    return {
      text: 'I love Alessandra , AlessandraGiulio',
      word: 'Alessandra',
      live: false,
    }
  },
  directives: {
    vueHighlighter
  }
}
</script>
```

#### Option
  **Live**: Allow to highlight word and substring, by automatically changhe the regex expression <br>
  The live attribute is an optional attribute, is set to false by default
  ```js
  data: () => {
    return {
      text: 'I love Alessandra',
      word: 'Alessandra',
      live: true,
    }
  }
  ```

  **Color**: Allow to customize the color of text when highlighted<br>
  The color attribute is optional and is set to #fff by default<br>
  color can be HEX or String<br>

  ```js
  data: () => {
    return {
      text: 'I love Alessandra',
      word: 'Alessandra',
      style: {
        color: '#ffddee'
      }
    }
  }
  ```

**Background Color**: Allow to customize the background color of text when highlighted<br>
The bgColor attribute is optional and is set to #009688 by default<br>
bgColor can be HEX or String
  
  ```js
  data: () => {
    return {
      text: 'I love Alessandra',
      word: 'Alessandra',
      style: {
        bgColor: '#ffddee'
      }
    }
  }
  ```

**Padding**: Allow to customize the padding of text when highlighted<br>
The padding attribute is optional and is set to 0px 5px by default<br>
padding is validate if match this requirments: there is at least one number followed by one of this unit of measure ['cm','mm','in','px','pt','pc','em','ex','ch','rem','vw','vh','vmin','vmax','%']
  
  ```js
  data: () => {
    return {
      text: 'I love Alessandra',
      word: 'Alessandra',
      style: {
        padding: '4rem 5%'
      }
    }
  }
  ```

## Works on

* Paragraph
* Ul
* Ol
* Button 
* A 

### Contributor

Thanks to [Andrea Stagi](https://github.com/astagi) to help me with troubleshooting ❤️.


## License

MIT &copy; [Giulio Fagioli](https://github.com/remeic)
