import { defineStore } from "pinia";

export const useGasStationStore = defineStore("gasStationStore", {
  state: () => ({
    gasStationList: [],
    fuelType: [],
    brandType: [],
  }),
  actions: {
    /* A function that is used to get the gas station list from the API. */
    async getGasStationList(fuelType) {
      let filter = ""
      try {
        if (fuelType === 'all') {
          filter = "sort=dist&type=all"
        } else {
          filter = `sort=price&type=${fuelType}`
        }
        const result = await fetch(
          `https://creativecommons.tankerkoenig.de/json/list.php?lat=52.521&lng=13.438&rad=30&${filter}&apikey=00000000-0000-0000-0000-000000000002`
        );
        const gasStation = await result.json();
        this.gasStationList = gasStation.stations;
        return this.gasStationList
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
   /* A getter that is used to get the brand type from the gasStationList. */
    getBrandType: (state) => {
      const capitalizeFirstLetter = (str) =>
        str.charAt(0).toUpperCase() + str.slice(1);
      const auxBrandArray = state.gasStationList
        ?.map((station) => capitalizeFirstLetter(station.brand))
        .filter((brand) => brand !== "");
      const auxSet = new Set(auxBrandArray);
      return Array.from(auxSet).sort();
    },
  },
});
