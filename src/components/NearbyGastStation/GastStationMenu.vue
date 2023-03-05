<template>
  <v-container class="mt-6">
    <v-row :class="xs ? 'd-flex flex-column align-center' : 'd-flex align-center justify-center'">
      <v-col :cols="xs ? 10 : 4">
        <v-text-field
          :disabled="isLoading"
          :loading="isLoading"
          v-model="currentLatitude"
          :rules="rules"
          label="Latitude"
          variant="outlined"
          hide-details="true"
          density="comfortable"
        />
      </v-col>
      <v-col :cols="xs ? 10 : 4">
        <v-text-field
          :disabled="isLoading"
          :loading="isLoading"
          v-model="currentLongitude"
          :rules="rules"
          label="Longitude"
          variant="outlined"
          hide-details="true"
          density="comfortable"
        />
      </v-col>
    </v-row>
    <v-row :class="xs ? 'd-flex flex-column align-center' : 'd-flex align-center justify-center'">
      <v-col :cols="xs ? 10 : 4">
        <v-select
          clearable
          :disabled="isLoading"
          :loading="isLoading"
          label="Select your brand"
          :items="gasStationStore.getBrandType"
          v-model="selectedBrand"
          variant="outlined"
          hide-details="true"
          density="comfortable"
        />
      </v-col>
      <v-col :cols="xs ? 10 : 4">
        <v-select
          label="Select your fuel type"
          :disabled="isLoading"
          :loading="isLoading"
          v-model="selectedFuel"
          :items="fuelType"
          variant="outlined"
          hide-details="true"
          density="comfortable"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex align-center justify-center">
      <v-col cols="auto">
        <v-checkbox
          :disabled="isLoading"
          hide-details="true"
          v-model="hideClosedGasStationsStatus"
          :label="`Show only open: ${hideClosedGasStationsStatus.toString()}`"
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <GastStationList :gasStationList="gasStationList" />
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useGasStationStore } from "@/store/gas-station.store.js";
import  GastStationList  from "./GastStationList.vue";
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()
const gasStationStore = useGasStationStore();

// -- Local Variables --
const isLoading = ref(false);
const hideClosedGasStationsStatus = ref(false);
const selectedBrand = ref("");
const currentLatitude = ref("");
const currentLongitude = ref("");
const gasStationList = ref([]);
const fuelType = ["e5", "e10", "diesel", "all"];
const selectedFuel = ref("all");
const rules = [(value) => !!value || "A value is required."];

// -- Methods --
// Calling the `getGasStationList()` method from the `gas-station.store.js` file.
const getGasStationList = async () => {
  try {
    isLoading.value = true;
    gasStationList.value = await gasStationStore.getGasStationList(
      selectedFuel.value
    );
    applyFilters();
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

// Getting the user's location and then calling the `getGasStationList()` method.
const getUserLocation = async () => {
  try {
    isLoading.value = true;
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    currentLatitude.value = position.coords.latitude;
    currentLongitude.value = position.coords.longitude;
  } catch (error) {
    console.log(error);
  } finally {
    getGasStationList();
  }
};

// Filtering the gasStationList based on the selectedBrand.
const applyBrandFilter = () => {
  if (selectedBrand.value) {
    gasStationList.value = gasStationStore.gasStationList.filter(
      (gasStation) =>
        gasStation.brand.toLowerCase() === selectedBrand.value.toLowerCase()
    );
  } else {
    gasStationList.value = gasStationStore.gasStationList;
  }
};

// Filtering the gasStationList based on the hideClosedGasStationsStatus.
const hideClosedGasStations = () => {
  if (hideClosedGasStationsStatus.value) {
    gasStationList.value = gasStationList.value.filter(
      (gasStation) => gasStation.isOpen === hideClosedGasStationsStatus.value
    );
  }
};

// A method that is called when the user changes the brand or the hideClosedGasStationsStatus.
const applyFilters = () => {
  applyBrandFilter();
  hideClosedGasStations();
};

// -- Watcher --
// Watching for changes in the selectedBrand, selectedFuel, and hideClosedGasStationsStatus.
watch(selectedBrand, () => {
  applyFilters();
});

watch(selectedFuel, () => {
  getGasStationList();
});

watch(hideClosedGasStationsStatus, () => {
  applyFilters();
});

// -- Lifecycle --
onMounted(() => {
  getUserLocation();
});
</script>

<style ></style>