<template>
  <div class="app">
    <h1>儒雅随和，口吐芬芳</h1>
    <p>{{star}}</p>
    <!-- <el-tag type="danger">带带大师兄</el-tag>
    <p class="error">情深深嘴臭臭</p>
    <p class="error-word">带恶人</p>
    <p class="slogan">还没到9点，我凭什么不吵嘛</p>
    <div class="neighbor" style="height: 100px;">。。。</div> -->
    <div>
      <router-link to="/home">Home</router-link>
      <router-link to="/about">About</router-link>
      <div>
        <router-view></router-view>
      </div>
    </div>
    <div>
      <p>{{getCounter}}</p>
      <el-button type="primary" @click="add(2)">Add One</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
      star: '带带大师兄'
    }
  },
  computed: {
    ...mapGetters('home', ['getCounter'])
  },
  methods: {
    ...mapActions('home', ['add'])
  }
}
</script>

<style lang="scss">
  .app {
    margin: 0 auto;
    text-align: center;
    color: lime;
  }
</style>

