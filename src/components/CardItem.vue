<template>
  <q-card bordered>
    <q-card-section>
      <div>{{ name }}</div>
      <div>{{ nameEn }}</div>
    </q-card-section>

    <q-card-section>{{ name }}</q-card-section>

    <q-separator dark />

    <q-card-actions align="around">
      <q-btn flat icon="edit">编辑</q-btn>
      <q-btn flat icon="delete" color="deep-orange">删除</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardItem',
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
</style>
