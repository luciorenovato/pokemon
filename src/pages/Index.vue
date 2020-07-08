<template>
  <q-page class="flex flex-center">
    <div class="row justify-around" style="padding: 15px">
      <div class="col-4" style="padding: 30px" v-for="creature in creatures" :key="creature.id">
        <q-card class="my-card">
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${creature.id}.png`">
          <q-card-section>
            <div class="text-h6">{{ creature.name }}</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      creatures: [
        { id: 1, name: 'Name 1' },
        { id: 2, name: 'Name 2' },
        { id: 3, name: 'Name 3' },
        { id: 4, name: 'Name 4' },
        { id: 5, name: 'Name 5' },
        { id: 6, name: 'Name 6' }
      ]
    }
  }
}
</script>
