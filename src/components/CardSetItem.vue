<template>
  <q-item class="card-set-item" clickable v-ripple>
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label>{{ nameEn }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardSetItem',
  props: {
    name: {
      type: String,
      required: true
    },
    nameEn: {
      type: String,
      required: true
    },
  }
})
</script>

<style lang="sass">
.card-set-item
</style>
