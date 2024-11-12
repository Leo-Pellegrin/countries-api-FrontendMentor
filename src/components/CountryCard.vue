<template>
    <v-card elevation="0" :class="themeClass">
        <v-img width="300px" :src="country.flags.svg" ratio="16/9" :alt="country.flags.alt" class="flag-image" />

        <v-card-title class="mb-4 font-weight-black">{{ country.name.common }}</v-card-title>

        <v-card-text>
            <p class="mb-1"><span class="font-weight-bold">Population : </span>{{ country.population }}</p>
            <p class="mb-1"><span class="font-weight-bold">Region : </span>{{ country.region }}</p>
            <p class="mb-4"><span class="font-weight-bold">Capital : </span> {{ country.capital &&
                country.capital.length > 0 ? country.capital[0] : 'N/A' }}
            </p>
        </v-card-text>
    </v-card>
</template>

<script setup>

import { useTheme } from 'vuetify'

const theme = useTheme();

const props = defineProps({
    country: Object
})

const themeClass = computed(() => {
    return theme.global.name.value == 'dark' ? 'bg-dark-theme' : 'bg-light-theme';
})

</script>

<style scoped>
.flag-image {
    aspect-ratio: 4 / 3;
    /* Change this to match the flag's natural ratio */
    object-fit: contain;
    width: 100%;
    height: auto;
    margin-inline: auto;
}

.bg-dark-theme {
    background-color: #121212;
    color: hsl(0, 0%, 100%);
}

.bg-light-theme {
    background-color: hsl(0, 0%, 98%);
    color: hsl(200, 15%, 8%);
}
</style>