<template>
    <v-app-bar app :elevation="2">

        <v-app-bar-title class="font-weight-bold">Where in the world ?</v-app-bar-title>

        <template v-slot:append>
            <v-btn @click="toggleTheme" :aria-pressed="!lighttheme"
                :prepend-icon="lighttheme ? 'mdi-lightbulb-night-outline' : 'mdi-lightbulb-night'">
                {{ lighttheme ? 'Dark Mode' : 'Light Mode' }}
            </v-btn>
        </template>
    </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify'
const theme = useTheme()

const lighttheme = ref(true); // Track the current theme state

const toggleTheme = () => {
    console.log(theme.global.name.value); // Log current theme name
    console.log(lighttheme.value); // Log current theme state

    // Toggle the theme state
    lighttheme.value = !lighttheme.value;

    // Set the Vuetify theme based on the toggled state
    theme.global.name.value = lighttheme.value ? 'light' : 'dark'; 

    console.log(theme.global.name.value); // Log updated theme name
    console.log(lighttheme.value); // Log updated theme state
};
</script>