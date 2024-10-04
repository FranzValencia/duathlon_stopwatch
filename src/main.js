import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import Aura from "@primevue/themes/aura";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

// import axios from 'axios';

// Set a base URL for all requests
axios.defaults.baseURL = "http://192.168.50.51:89";

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

app.use(ToastService);
app.use(ConfirmationService);

app.use(createPinia());
app.use(router);
app.mount("#app");

window.app = app;
