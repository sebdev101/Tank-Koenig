<template>
  <v-row v-for="gasStation in gasStationList" :key="gasStation.id" class="mb-n4">
    <v-col>
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card class="rounded-lg" v-bind="props" :elevation="isHovering ? 3 : 1">
            <v-container>
              <v-row class="d-flex">
                <v-col cols="auto">
                  <v-avatar size="75" color="primary" variant="outlined">
                    <v-icon size="x-large" color="primary">mdi-gas-station</v-icon>
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-container class="pa-0 mt-1">
                    <v-row class="d-flex align-center">
                      <v-col cols="auto" class="text-h6 text-color pt-3">
                        {{ gasStation.name }}
                      </v-col>
                      <v-col cols="auto" class="pa-0">
                        <v-chip size="small" :color="gasStation.isOpen ? 'secondary' : 'red'">
                          {{ gasStation.isOpen ? 'Open' : 'Closed' }}
                        </v-chip>
                      </v-col>
                    </v-row>
                    <v-row :class="xs ? 'd-flex flex-column font-weight-light pt-0' : 'font-weight-light mt-0'">
                      <v-col cols="auto" class="text-body-1 font-weight-light pt-3">
                        {{ gasStation.brand }}
                      </v-col>
                      <v-col cols="auto">
                        {{ gasStation.street }}
                      </v-col>
                      <v-col cols="auto">
                        {{ gasStation.place }}
                      </v-col>
                      <v-col cols="auto" class="pr-0">
                        {{ gasStation.postCode }}
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col :cols="xs ? 2 : 1" :class="xs ? 'd-flex align-start justify-end mr-2 mt-2' : 'd-flex align-center justify-end mr-2'">
                  <v-snackbar
                    location="bottom right"
                    :timeout="2000"
                    color="primary"
                    rounded="pill"
                  >
                    <template v-slot:activator="{ props }">
                      <v-btn
                        class="share-button-style"
                        rounded="pill"
                        v-bind="props"
                        @click="copyToClipboard(gasStation)"
                      >
                        Share
                      </v-btn>
                    </template>
                   <div> Info Copied!</div>
                  </v-snackbar>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from 'vuetify'

const { xs } = useDisplay()

//eslint-disable-next-line
const props = defineProps({
  gasStationList: {
    type: Object,
    required: true,
    default: () => {}
  }
})

// A function that is called when the user clicks on the share button. It takes the gasStation object
// as a parameter and creates a message that is copied to the clipboard.
const copyToClipboard = (gasStation) => {
  const shareMessage = `Look! I found this cheap gas station ${gasStation.name} (${gasStation.brand}) at ${gasStation.street} ${gasStation.place} ${gasStation.postCode}`
  navigator.clipboard.writeText(shareMessage)
}
</script>
<style scoped>x
.text-color {
  color: #4c54a0;
}

.share-button-style {
  font-size: 12px !important;
  font-weight: 700 !important;
  box-shadow: none !important;
  color: #fff !important;
  background-color: #01cea3 !important;
}

.share-button-style:hover {
  background-color: #04E9B6 !important;
}
</style>
