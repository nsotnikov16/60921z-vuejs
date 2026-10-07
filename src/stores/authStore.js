import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    errorMessage: "",
  }),
  actions: {
    async login(credentials) {
      this.errorMessage = '';
      try {
        const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_API_URL}/login`, credentials, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem('token', response.data.token);
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },
    async getUser() {
      this.errorMessage = '';
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_API_URL}/user`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },
    async logout() {
      this.token = null;
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  },
})
