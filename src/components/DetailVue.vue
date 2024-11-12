<template>
  <div>
    <v-btn prepend-icon="mdi-keyboard-backspace" variant="outlined" elevation="2" rounded="sm"
      class="text-none text-subtitle-1 mt-16 ml-16 px-8" @click="goToHome()">
      Back
    </v-btn>
    <div>
      <v-row no-gutters class="mt-16">
        <!-- Flag -->
        <v-col class="mt-14 ml-16">
          <v-img v-if="country.length > 0" width="550px" :src="country[0].flags.svg" ratio="16/9"
            :alt="country[0].flags.alt" class="flag-image">
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-col>
        <!-- Informations -->
        <v-col class="mt-16">
          <v-card v-if="country.length > 0" class="mr-16 cardbg-color" elevation="0">
            <v-card-title class="font-weight-black">
              <p class="detail-title">
                {{ country.length > 0 ? country[0].name.common : 'Loading...' }}
              </p>
            </v-card-title>
            <v-card-text class="mt-5">
              <v-row>
                <v-col class="details-spacing">
                  <p><strong>Native name: </strong>{{ Object.values(country[0].name.nativeName)[0].common }}</p>
                  <p><strong>Population: </strong><span>{{ country[0].population }}</span></p>
                  <p><strong>Region: </strong>{{ country[0].region }}</p>
                  <p><strong>Sub Region: </strong>{{ country[0].subregion }}</p>
                  <p>
                    <strong>Capital: </strong>
                    <span v-for="(capital, index) in country[0].capital" :key="index">
                      {{ capital }}
                      <span v-if="index < country[0].capital.length - 1">, </span>
                    </span>
                  </p>
                </v-col>

                <v-col class="details-spacing">
                  <p>
                    <strong>Top Level Domain: </strong>
                    <span v-for="(tld, index) in country[0].tld" :key="index">
                      {{ tld }}
                      <span v-if="index < country[0].tld.length - 1">, </span>
                    </span>
                  </p>
                  <p v-if="country[0] && country[0].currencies">
                    <strong>Currencies: </strong>
                    <span v-for="(currency, index) in Object.values(country[0].currencies)" :key="index">
                      {{ currency.name }}
                      <span v-if="index < Object.values(country[0].currencies).length - 1">, </span>
                    </span>
                  </p>
                  <p v-else>
                    <strong>Currencies:</strong> No data available
                  </p>
                  <p>
                    <strong>Languages: </strong>
                    <span v-for="(language, index) in Object.values(country[0].languages)" :key="index">
                      {{ language }}
                      <span v-if="index < Object.values(country[0].languages).length - 1">, </span>
                    </span>
                  </p>
                </v-col>
              </v-row>

            </v-card-text>
            <v-card-actions class="mt-5 ml-2">
              <p class="mr-3" style="font-size: 15px;"><strong>Border Countries:</strong></p>
              <div v-if="borders.length > 0">
                <v-btn v-for="(border, index) in borders" :key="index" elevation="1" class="text-none ml-1" rounded="sm"
                  @click="goToCountry(border)">
                  <span style="font-size: 13px;">{{ border }}</span>
                </v-btn>
              </div>
              <div v-else>
                <span style="font-size: 13px;">No border countries</span>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const countryname = ref(route.params.countryname);

const country = ref([]);
const borders = ref([]);
const isLoading = ref(true);


onMounted(() => {
  getCountryData();
  isLoading.value = false;
});

async function getCountryData() {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryname.value}`); // Utilise countryname.value
    if (response.ok) {
      country.value = await response.json(); // Stocke les données dans le tableau
      console.log(country.value); // Affiche les données du pays
      if (country.value[0].borders) {
        getBorderCountries(country.value[0].borders);
      }
    } else {
      console.error('Erreur lors de la récupération des données', response.status); // Gère les erreurs
    }
  } catch (error) {
    console.error('Erreur de réseau ou autre', error); // Gère les exceptions
  }
}

async function getBorderCountries(borderCodes) {
  const borderNames = [];
  try {
    const promises = borderCodes.map(async (code) => {
      const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
      if (!response.ok) {
        throw new Error(`Erreur de récupération du pays avec le code : ${code}`);
      }
      const data = await response.json();
      console.log(data)
      return data[0].name.common; // Récupère le nom commun du pays
    });

    borderNames.push(...await Promise.all(promises)); // Attendre que toutes les promesses soient résolues
    borders.value = borderNames; // Stocke les noms complets dans le tableau
    console.log('borders', borders.value)
  } catch (error) {
    console.error('Erreur lors de la récupération des pays frontaliers:', error);
  }
}

function goToHome() {
  router.push('/')
}

function goToCountry(name) {
  console.log(name)
  window.location.replace(`/country/${name}`);


}

</script>

<style scoped>
.details-spacing p {
  margin-bottom: 10px;
}

.detail-title {
  font-size: 27px;
}


.theme--dark .cardbg-color{
    background-color: #121212;
}
</style>