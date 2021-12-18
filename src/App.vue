<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>天天识字卡 管理后台</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="200">
      <q-list>
        <menu-item v-for="item in menus" :key="item.title" v-bind="item" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import MenuItem from './components/MenuItem.vue'
import menus from './router/menus'

export default {
  name: 'LayoutDefault',

  components: {
    MenuItem
  },

  setup() {
    const leftDrawerOpen = ref(false)
    return {
      menus,
      leftDrawerOpen: ref(false),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>
