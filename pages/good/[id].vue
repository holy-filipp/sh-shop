<template>
  <Good v-if="validate.success" :good-id="id" />
</template>
<script lang="ts" setup>
import { z } from 'zod'

const route = useRoute()
const schema = z.string()

const validate = computed(() => {
  return schema.safeParse(route.params.id)
})

const id = computed(() => {
  const res = schema.safeParse(route.params.id)

  return res.data ?? ''
})
</script>
