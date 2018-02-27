<template>
  <div id="app" @click='hideCart'>
    <com-header></com-header>
    <!-- <router-link to='/pomelo'>test</router-link> -->
    <router-view></router-view>
  </div>
</template>
<script>
import comHeader from '@/components/header'
export default {
  name: 'App',
  computed: {
    modelFlag () {
      return this.$store.state.modelFlag
    }
  },
  components: {
    comHeader
  },
  methods: {
    hideCart () {
      this.$store.state.cartShowFlag = false
      console.log('click')
    }
  }
}
</script>
