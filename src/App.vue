<template>
  <div id="app">
  	<com-header></com-header>
  	<com-list></com-list>
  </div>
</template>

<script>
import comHeader from '@/components/header'
import comList from '@/components/goods-list'
export default {
  name: 'App',
  components: {
  	comHeader,
  	comList
  }
}
</script>
