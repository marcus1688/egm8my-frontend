<template>
  <div></div>
</template>

<script setup>
const localePath = useLocalePath();
await navigateTo(localePath("/"));
</script>
