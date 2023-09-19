<script setup>
import {ref} from 'vue'

const count = ref(0)
</script>

<template>
  <button :class="$style.button" @click="count++">You clicked me {{ count }} times.</button>
</template>

<style lang="scss" module>
.button {
  color: red;
}
</style>
