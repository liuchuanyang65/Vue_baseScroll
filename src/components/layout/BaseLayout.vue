<template>
  <div class="container">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="stylus" scoped>
.container
  width 100%
  height 100%
</style>
