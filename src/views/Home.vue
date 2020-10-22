<template>
  <div class="home">
    <Pessoas/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Pessoas from '@/views/pessoas/Pessoas.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld, Pessoas
  }
}
</script>
