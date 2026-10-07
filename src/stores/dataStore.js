import { defineStore } from 'pinia';
import axios from 'axios';
const backendUrl = import.meta.env.VITE_APP_BACKEND_API_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    categories: [],
    categories_total: null,
    items: [],
    errorMessage: "",
  }),
  actions: {
    async get_categories(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/categories', {
          params: {
            page: page,
            perpage: perpage
          }
        });
        this.categories = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async get_categories_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/categories_total');
        this.categories_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
    async get_advertisements(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/advertisements', {
          params: {
            page: page,
            perpage: perpage
          }
        });
        this.advertisements = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async get_advertisements_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(backendUrl + '/advertisements_total');
        this.advertisements_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
  },
});
