<template>
  <div class="full-screen">
    <div v-if="$route.path != '/'">
      <ljNav />
    </div>
    <div class="main">
      <nuxt />
    </div>
  </div>
</template>
<script>
  // import sidebar from './sidebar';
  import ljNav from './lj-nav';
  import auth from '@middleware/auth';
  export default {
    middleware: ['auth'],
    components: {
      ljNav
    }
  }
</script>
<style>
html {
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;

}

#__nuxt, #__layout {
  width: 100%;
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.sidebar {
  float: left;
  width: 25vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
}

.main {
  width: 100%;
  height: 100%;
}
</style>