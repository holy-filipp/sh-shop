<template>
  <Catalog :path="route.params.slug" />
</template>
<script lang="ts" setup>
const route = useRoute()
</script>
