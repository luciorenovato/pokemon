<template>
  <q-layout view="hHh lpR fFf">

    <q-header reveal elevated class="bg-red text-white">
      <q-toolbar>
        <q-toolbar-title>
          Pokemon Store
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      right: false
    }
  }
}
</script>
