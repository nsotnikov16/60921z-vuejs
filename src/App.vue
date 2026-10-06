<script setup>
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
</script>

<template>
  <div class="m-2">
    <Menubar :model="items">
      <template #start>
        <span>
          <img src="@/assets/SurSU-2.png" width="50" alt="My SVG Icon" />
        </span>
      </template>
      <template #item="{ item }">
        <div class="flex items-center ml-6 p-4">
          <router-link v-if="item.route" :to="item.route">
            <span :class="item.icon"></span>
            <span class="ml-1">{{ item.label }}</span>
          </router-link>
        </div>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <div v-if="isAuthenticated && user">
            <span class="pi pi-fw pi-user mr-4">{{ user.name }}</span>
            <Button @click="logout" class="ml-4">Выйти</Button>
          </div>
          <div v-else>
            <form @submit.prevent="login">
              <InputText v-model="email" type="email" id="email" required placeholder="Email" class="m-2 sm:w-auto"
                :class="{ 'p-invalid': authError }" />
              <InputText v-model="password" type="password" id="password" required placeholder="Пароль"
                class="m-2 sm:w-auto" :class="{ 'p-invalid': authError }" />
              <Button type="submit">Войти</Button>
              <div class="ml-2"><small v-if="authError" class="error">{{ authError }}</small></div>
            </form>
          </div>
        </div>
      </template>
    </Menubar>
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from './stores/authStore';

export default {
  data() {
    return {
      email: '',
      password: '',
      authStore: useAuthStore(),
      items: [
        // Define your menu items here
        {
          label: 'Главная страница',
          icon: 'pi pi-fw pi-home',
          route: '/',
          shortcut: 'Ctrl + H',
          submenu: [
            // Submenu items
          ],
        },
        {
          label: 'Категории',
          icon: 'pi pi-fw pi-folder',
          route: '/categories',
        },
        {
          label: 'Объявления',
          icon: 'pi pi-fw pi-box',
          route: '/items',
        }
      ]
    }
  },
  computed: {
    isAuthenticated() {
      return this.authStore.isAuthenticated;
    },
    user() {
      return this.authStore.user;
    },
    authError() {
      return this.authStore.errorMessage;
    }
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
    login() {
      this.authStore.login({ email: this.email, password: this.password });
    },
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
    console.log(import.meta.env);

  }
}
</script>
<style scoped>
.error {
  color: red;
}
</style>
