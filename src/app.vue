<template>
  <div class="app">
    <h1>儒雅随和，口吐芬芳</h1>
    <p>{{star}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      star: '带带大师兄'
    }
  }
}
</script>

<style lang="scss">
  .app {
    margin: 200px;
    text-align: center;
    color: lime;
  }
</style>

