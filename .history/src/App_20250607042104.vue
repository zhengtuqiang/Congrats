<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Hello from './Hello/index.vue'
import Read from './Read/index.vue'
import Write from './Write/index.vue'
import Confetti from './Confetti/index.vue'

const route = ref('')
const enterAction = ref({})
// 添加开发环境模拟代码
if (import.meta.env.DEV) {
  route.value = 'ztqconfetti' // 强制显示撒花组件
}
onMounted(() => {
  window.utools.onPluginEnter((action) => {
    route.value = action.code
    enterAction.value = action
  })
  window.utools.onPluginOut((isKill) => {
    route.value = ''
  })
})
</script>

<template>
  <template v-if="route === 'hello'">
    <Hello :enterAction="enterAction"></Hello>
  </template>
  <template v-if="route === 'read'">
    <Read :enterAction="enterAction"></Read>
  </template>
  <template v-if="route === 'write'">
    <Write :enterAction="enterAction"></Write>
  </template>
  <template v-if="route === 'confetti'">
    <Confetti :enterAction="enterAction"></Confetti>
  </template>
</template>
