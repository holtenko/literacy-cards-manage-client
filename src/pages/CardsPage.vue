<template>
  <q-page class="card-page-container">
    <q-scroll-area class="card-set-list-area" style="height: calc(100vh - 50px)">
      <q-list class="card-set-list" bordered separator>
        <card-set-item
          v-for="item in cardSets"
          :key="item.id"
          v-ripple
          v-bind="item"
          @click="loadCards(item.id)"
        />
      </q-list>
    </q-scroll-area>
    <div class="card-table-area">
      <q-table
        class="my-sticky-header-table"
        title="卡片详情"
        :rows="cards"
        :columns="columns"
        row-key="id"
        flat
        bordered
        separator="cell"
        :pagination="pagination"
      />
    </div>
  </q-page>
</template>

<script>
import CardSetItem from '../components/CardSetItem.vue'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CardsPage',
  components: { CardSetItem },
  data() {
    return {
      cardSets: [],
      cards: [],
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'center',
          style: 'width: 10px',
        }, {
          name: 'cardSetId',
          label: '卡片集ID',
          field: 'cardSetId',
          align: 'center',
          style: 'width: 10px',
        }, {
          name: 'priority',
          label: '顺序',
          field: 'priority',
          align: 'center',
          style: 'width: 10px',
        }, {
          name: 'name',
          label: '中文',
          field: 'name',
          align: 'center',
        },{
          name: 'nameEn',
          label: '英文',
          field: 'nameEn',
          align: 'center',
        }, {
          name: 'content',
          label: '内容',
          field: 'content',
          align: 'center',
        }, {
          name: 'phonetic',
          label: '拼音',
          field: 'phonetic',
          align: 'center',
        }, {
          name: 'phoneticEn',
          label: '音标',
          field: 'phoneticEn',
          align: 'center',
        }, {
          name: 'color',
          label: '背景颜色',
          field: 'color',
          align: 'center',
          style: 'width: 10px',
        }
      ],
    }
  },
  methods: {
    loadCardSets() {
      this.fetchData({
        url: '/cardset/all',
        method: 'get',
      })
        .then((response) => {
          this.cardSets = response.data
        })
        .catch((error) => {
          console.log(error);
        })
    },
    loadCards(cardSetId) {
      this.fetchData({
        url: '/card/' + cardSetId,
        method: 'get',
      })
        .then((response) => {
          this.cards = response.data
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted() {
    this.loadCardSets()
  }
});
</script>

<style lang="sass">

.card-page-container

.card-set-list-area
  float: left
  width: 20%
  background: #F2C037

.card-table-area
  float: left
  width: 80%
  background: #12C137

.my-sticky-header-table
  /* height or max-height is important */
  height: calc(100vh - 50px)

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>