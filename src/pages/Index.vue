<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-md-9 col-sm-12">
        <div class="row justify-around" style="padding: 5px">
          <div class="col-md-4 col-sm-12" style="padding: 5px" v-for="(creature, index) in currentPage" :key="index">
            <q-card>
              <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${creature.url}.png`">
              <q-card-section class="bg-red">
                <div class="text-h6">{{ creature.name }}</div>
              </q-card-section>
              <q-card-section class="bg-red">
                <div class="text-h5">${{ creature.price }},00</div>
                <div class=" text-right cursor-pointer"><q-btn round color="primary" icon="add_shopping_cart" @click="addToCart(creature)"/></div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-12">
        <div class="row justify-around" style="padding: 5px">
          <div class="col-12" style="padding: 5px; background-color: red">
            <q-card>
              <div class="row">
                <div class="col-12">
                  <div class="text-h3">Carrinho</div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-12" style="padding: 5px; background-color: red" v-for="(item, index) in cart" :key="index">
            <q-card>
              <div class="row items-center">
                <div class="col-2">
                  <img width='100%' :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url}.png`">
                </div>
                <div class="col-4">
                  <div class="text-body">{{ item.name }}</div>
                </div>
                <div class="col-4">
                  <div class="text-body">${{ item.price }},00</div>
                </div>
                <div class="col-1">
                  <div class="text-right cursor-pointer"><q-btn round color="primary" icon="delete" @click="removeFromCart(item)"/></div>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-md-12 col-sm-12" style="padding: 5px; background-color: red">
            <q-card>
              <div class="row">
                <div class="col-12">
                  <div class="text-h4 text-right">Total: ${{ total }}</div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </div>
    <div class="row items-center float-bottom" style="padding: 5px">
      <div class="col-md-12 col-sm-12">
        <q-btn round color="red" icon="arrow_left" @click="previousPage()" />
        Página: {{ page }}/{{ Math.ceil(count / pageSize) }}
        <q-btn round color="red" icon="arrow_right" @click="nextPage()" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageIndex',
  data () {
    return {
      count: 964,
      page: 1,
      offset: 0,
      pageSize: 6,
      apiUrl: 'https://pokeapi.co/api/v2/pokemon/?&limit=964'
    }
  },
  computed: {
    ...mapState(['creatures', 'cart']),
    total: function () {
      let totalPrice = 0
      this.cart.forEach(function (item) {
        totalPrice = totalPrice + item.price
      })
      return totalPrice
    },
    currentPage: function () {
      return this.creatures.filter((creature, index) => index >= this.offset && index < this.offset + this.pageSize)
      // return this.creatures
    }
  },
  methods: {
    ...mapMutations(['setCreatures', 'addToCart', 'removeFromCart']),
    nextPage () {
      if (this.page < this.count / this.pageSize) {
        this.offset = this.offset + this.pageSize
        this.page++
      }
    },
    previousPage () {
      if (this.page > 1) {
        this.offset = this.offset - this.pageSize
        this.page--
      }
    },
    loadCreatures () {
      this.$axios.get(this.apiUrl)
        .then((response) => {
          this.data = response.data
          console.log(this.data)
          this.data.results.forEach(function (item, index, arr) {
            arr[index].price = ((parseInt(arr[index].url.split('/')[6]) - 1) % 3 + 1) * 10
            arr[index].url = arr[index].url.split('/')[6]
          })
          this.setCreatures(this.data.results)
          if (this.apiUrl.indexOf('offset') > 0) {
            this.page = (parseInt(this.apiUrl.split('offset=')[1].split('&limit')[0]) + 6) / 6
          } else {
            this.page = 1
          }
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    }
  },
  mounted () {
    this.loadCreatures()
  }
}
</script>
