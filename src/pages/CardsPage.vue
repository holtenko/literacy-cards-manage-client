<template>
  <q-page class="card-page-container">
    <q-scroll-area class="card-set-list-area" style="height: calc(100vh - 50px)">
      <q-list class="card-set-list" bordered separator>
        <q-item-label header>卡片集列表</q-item-label>
        <q-item>
          <q-btn flat icon="add" color="primary" label="新增卡片集" @click="isAddSet = true" />
        </q-item>
        <card-set-item
          v-for="item in cardSets"
          :key="item.id"
          v-bind="item"
          @click="loadCards(item)"
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
      >
        <template v-slot:top>
          <div style="font-size:25px; margin-right:10px">卡片详情</div>
          <q-btn
            flat
            icon="add"
            color="primary"
            label="新增卡片"
            :disable="!currentCardSet.id"
            @click="isAdd = true; newCard.cardSetId = currentCardSet.id"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="priority" :props="props">
              <q-badge v-if="props.row.content == currentCardSet.cover" color="red" rounded />
              {{ props.row.priority }}
            </q-td>
            <q-td key="id" :props="props">{{ props.row.id }}</q-td>
            <q-td key="cardSetId" :props="props">{{ props.row.cardSetId }}</q-td>
            <q-td key="name" :props="props">{{ props.row.name }}</q-td>
            <q-td key="nameEn" :props="props">{{ props.row.nameEn }}</q-td>
            <q-td key="content" :props="props" :style="'background:' + props.row.color">
              <q-img
                v-if="props.row.content.match(RegExp('/images/*'))"
                :src="'http://localhost:8080/resource' + props.row.content"
                style="height: 30px;"
                fit="contain"
              />
              <span v-else style="font-size:30px">{{ props.row.content }}</span>
            </q-td>
            <q-td key="phonetic" :props="props" @click="playAudio(props.row.audio)">
              {{ props.row.phonetic }}
              <q-icon v-if="!props.row.audio" name="warning" color="red" />
              <q-icon v-else name="volume_up" color="green" />
            </q-td>
            <q-td key="phoneticEn" :props="props" @click="playAudio(props.row.audioEn)">
              {{ props.row.phoneticEn }}
              <q-icon v-if="!props.row.audioEn" name="warning" color="red" />
              <q-icon v-else name="volume_up" color="green" />
            </q-td>
            <q-td key="color" :props="props" style="width: 80px">
              <q-badge
                :style="'width: 60px; background:' + props.row.color"
                :label="props.row.color"
              />
            </q-td>
            <q-td key="color" :props="props" style="width: 120px">
              <q-btn
                color="primary"
                icon="edit"
                size="sm"
                label="编辑"
                @click="isEdit = true; currentCard = props.row"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <audio ref="audio" :src="audioToPlay"></audio>
  </q-page>
  <q-dialog v-model="isEdit">
    <q-card>
      <q-card-section>修改卡片</q-card-section>
      <q-card-actions>
        <q-form
          @submit="submitUpdateCard(currentCard)"
          @reset="cancleUpdateCard"
          class="q-gutter-md"
        >
          <q-input filled v-model="currentCard.priority" label="顺序" />
          <q-input filled v-model="currentCard.name" label="中文" />
          <q-input filled v-model="currentCard.nameEn" label="英文" />
          <q-input filled v-model="currentCard.content" label="内容" />
          <q-input filled v-model="currentCard.color" label="背景色">
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="currentCard.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-card-actions align="right">
            <q-btn label="提交" type="submit" color="primary" />
            <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="isAdd">
    <q-card>
      <q-card-section>新增卡片</q-card-section>
      <q-card-actions>
        <q-form
          @submit="submitAddCard(newCard)"
          @reset="this.isAdd = false; newCard = {}"
          class="q-gutter-md"
        >
          <q-input filled v-model="newCard.priority" label="顺序" />
          <q-input filled v-model="newCard.name" label="中文" />
          <q-input filled v-model="newCard.nameEn" label="英文" />
          <q-input filled v-model="newCard.content" label="内容" />
          <q-input filled v-model="newCard.color" label="背景色">
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="newCard.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-card-actions align="right">
            <q-btn label="提交" type="submit" color="primary" />
            <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="isAddSet">
    <q-card>
      <q-card-section>新增卡片集</q-card-section>
      <q-card-actions>
        <q-form
          @submit="submitAddCardSet(newCardSet)"
          @reset="this.isAddSet = false; newCardSet = {}"
          class="q-gutter-md"
        >
          <q-input filled v-model="newCardSet.priority" label="顺序" />
          <q-input filled v-model="newCardSet.name" label="中文" />
          <q-input filled v-model="newCardSet.nameEn" label="英文" />
          <div class="q-gutter-sm">
            <q-radio dense v-model="newCardSet.type" val="text" label="文字" />
            <q-radio dense v-model="newCardSet.type" val="image" label="图片" />
          </div>
          <q-input filled v-model="newCardSet.cover" label="封面内容" />
          <q-input filled v-model="newCardSet.color" label="背景色">
            <template v-slot:append>
              <q-icon name="colorize" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-color v-model="newCardSet.color" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-card-actions align="right">
            <q-btn label="提交" type="submit" color="primary" />
            <q-btn label="重置" type="reset" color="primary" flat class="q-ml-sm" />
          </q-card-actions>
        </q-form>
      </q-card-actions>
    </q-card>
  </q-dialog>
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
      currentCardSet: {},
      currentCard: {},
      newCard: {},
      newCardSet: { type: "text" },
      audioToPlay: '',
      isEdit: false,
      isAdd: false,
      isAddSet: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        {
          name: 'priority',
          label: '顺序',
          field: 'priority',
          align: 'center',
          style: 'width: 10px',
        }, {
          name: 'id',
          label: 'ID',
          field: 'id',
          align: 'center',
          style: 'width: 10px',
        }, {
          name: 'cardSetId',
          label: '卡片集',
          field: 'cardSetId',
          align: 'center',
          style: 'width: 10px',
        }, {
          name: 'name',
          label: '中文',
          field: 'name',
          align: 'center',
        }, {
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
        }, {
          label: '操作',
          align: 'center',
        }
      ],
    }
  },
  methods: {
    loadCardSets() {
      this.fetchData({
        url: '/cardset/all',
        method: 'get',
      }).then((response) => {
        this.cardSets = response.data
      }).catch((error) => {
        console.log(error);
      })
    },
    loadCards(cardSet) {
      this.currentCardSet.active = false;
      this.currentCardSet = cardSet;
      this.currentCardSet.active = true;
      this.fetchData({
        url: '/card/' + cardSet.id,
        method: 'get',
      }).then((response) => {
        this.cards = response.data
      }).catch((error) => {
        console.log(error);
      })
    },
    submitAddCardSet(cardSet) {
      this.fetchData({
        url: '/cardset/add',
        method: 'post',
        data: cardSet
      }).then((response) => {
        if (response.data) {
          this.$q.notify({
            message: '新增成功',
            type: 'positive',
            position: 'top',
            timeout: 1500
          })
        }
        this.loadCardSets();
      }).catch((error) => {
        console.log(error);
      })
      this.isAddSet = false;
      this.newCardSet = { type: "text" }
    },
    submitAddCard(card) {
      card.cardSetId = this.currentCardSet.id;
      this.fetchData({
        url: '/card/add',
        method: 'post',
        data: card
      }).then((response) => {
        if (response.data) {
          this.$q.notify({
            message: '新增成功',
            type: 'positive',
            position: 'top',
            timeout: 1500
          })
        }
        this.loadCards(this.currentCardSet);
      }).catch((error) => {
        console.log(error);
      })
      this.isAdd = false;
      this.newCard = {};
    },
    submitUpdateCard(card) {
      this.fetchData({
        url: '/card/update',
        method: 'post',
        data: card
      }).then((response) => {
        if (response.data) {
          this.$q.notify({
            message: '更新成功',
            type: 'positive',
            position: 'top',
            timeout: 1500
          })
        }
        this.loadCards(this.currentCardSet);
      }).catch((error) => {
        console.log(error);
      })
      this.isEdit = false;
    },
    cancleUpdateCard() {
      this.loadCards(this.currentCardSet);
      this.isEdit = false;
    },
    playAudio(audioSrc) {
      const audio = new Audio('http://localhost:8080/resource' + audioSrc);
      audio.play();
    }
  },
  mounted() {
    this.loadCardSets()
  }
});
</script>

<style lang="sass">

.card-set-list-area
  float: left
  width: 15%

.card-table-area
  float: left
  width: 85%

.my-sticky-header-table
  height: calc(100vh - 50px)
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #FFFFFF
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
</style>