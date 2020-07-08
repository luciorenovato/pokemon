<template>
  <q-page class="flex flex-center">
    <div class="row justify-around" style="padding: 15px">
      <div class="col-4" style="padding: 30px" v-for="(creature, index) in creatures" :key="index">
        <q-card class="my-card">
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${creature.url.split('/')[6]}.png`">
          <q-card-section>
            <div class="text-h6">{{ creature.name }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            R$ {{ creature.url.split('/')[6] % 8 * 12 + 10 }},00
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-btn round color="primary" icon="arrow_left" @click="loadCreatures(previous)" />
    Página: {{ page }}/{{ Math.ceil(count / 6) }}
    <q-btn round color="primary" icon="arrow_right" @click="loadCreatures(next)" />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      creatures: null,
      count: 0,
      page: 1,
      next: 'https://pokeapi.co/api/v2/pokemon/?&limit=6',
      previous: null
    }
  },
  methods: {
    loadCreatures (url) {
      this.$axios.get(url)
        .then((response) => {
          this.data = response.data
          console.log(this.data)
          this.count = this.data.count
          this.next = this.data.next
          this.previous = this.data.previous
          this.creatures = this.data.results
          if (url.indexOf('offset') > 0) {
            this.page = (parseInt(url.split('offset=')[1].split('&limit')[0]) + 6) / 6
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
    this.loadCreatures(this.next)
  }
}
</script>
