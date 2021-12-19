<template>
  <q-item
    class="card-set-item"
    clickable
    v-ripple
    :active="active"
    active-class="bg-teal-1 text-grey-8"
  >
    <q-item-section avatar>
      <q-avatar rounded size="42px" :style="'background:' + color">
        <q-img
          v-if="type == 'image'"
          :src="'http://localhost:8080/resource' + cover"
          style="height: 30px;"
          fit="contain"
        />
        <span v-else style="font-size:30px">{{ cover }}</span>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ name }}</q-item-label>
      <q-item-label caption>{{ nameEn }}</q-item-label>
    </q-item-section>
    <q-item-section side top>{{id}}</q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CardSetItem',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    nameEn: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    cover: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
    }
  }
})
</script>

<style lang="sass">
.card-set-item
</style>
