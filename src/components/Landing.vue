<template>
  <div class="fill-height px-15 maindiv">
    <v-row class="pt-15">
      <v-col cols="4">
        <v-text-field v-model="searchQuery" prepend-inner-icon="mdi-magnify">
          <template v-slot:label>
            <span class="filtertext">Search for a country...</span>
          </template>
        </v-text-field>
      </v-col>
      <v-col cols="5"></v-col>
      <v-col cols="3">
        <v-combobox class="pl-12" v-model="regionSelected" clearable
          :items="['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']">
          <template v-slot:label>
            <span class="filtertext">Filter by Region</span>
          </template>
        </v-combobox>
      </v-col>
    </v-row>
    <v-row v-for="i in nbpages" :key="i" class="mb-4" dense>

      <v-col v-for="(country, index) in filteredCountries.slice((i - 1) * 4, i * 4)" :key="index" cols="12" sm="6"
        md="3" lg="3">
        <CountryCard :country="country" @click="goToCountry(country.name.common)" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchQuery = ref("");
const regionSelected = ref("");
let allCountries = ref([]); // Liste complète pour réinitialiser
const filteredCountries = ref([]); // Liste filtrée pour l'affichage
const nbpages = ref(1);

onMounted(() => {
  getInitialData();
});

// Récupérer tous les pays au chargement
async function getInitialData() {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (response.ok) {
      allCountries.value = await response.json();
      filterCountries(); // Appliquer le filtre après le chargement initial
    }
  } catch (error) {
    console.error(error);
  }
}

function filterCountries() {
  // Si aucun filtre, afficher tous les pays
  if (!regionSelected.value && !searchQuery.value) {
    filteredCountries.value = allCountries.value;
  } else {
    // Filtrer en fonction des valeurs actuelles de `regionSelected` et `searchQuery`
    filteredCountries.value = allCountries.value.filter(country => {
      const matchesRegion = regionSelected.value ? country.region === regionSelected.value : true;
      const matchesSearch = searchQuery.value
        ? country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase())
        : true;
      return matchesRegion && matchesSearch;
    });
  }

  nbpages.value = Math.ceil(filteredCountries.value.length / 4);
}

watch([searchQuery, regionSelected], filterCountries);

function goToCountry(name){
  router.push({name: 'CountryDetail', params: {countryname: name}})
}
</script>