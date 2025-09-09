<script setup lang="ts">
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import FilterPeople from '../components/FilterPeople.vue'
</script>

<template>
	<Header />
	<main id="main-home"  class="flex-1">
		<FilterPeople />
		<router-view />
	</main>
	<Footer />
</template>
