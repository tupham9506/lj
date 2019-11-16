<template>
  <div class="full-screen">
    <div class="main" :class="{'w-100': ($route.path == '/')}">
      <nuxt />
    </div>
    <div v-if="$route.path != '/'" class="sidebar">
      <sidebar />
    </div>
  </div>
</template>
<script>
  import sidebar from './sidebar';
  import auth from '@middleware/auth';
  export default {
    middleware: ['auth'],
    components: {
      sidebar
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
  width: 20%;
  height: 100%;
}

.main {
  float: left;
  height: 100%;
  width: 80%;
}
</style>