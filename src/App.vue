<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="stylus" scoped>
#app
  width 100%
  height 100%
</style>
