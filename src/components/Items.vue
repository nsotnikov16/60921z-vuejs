<template>
  <h1 class="text-3xl mt-2 font-bold">Список объявлений</h1>
  <DataTable :value="advertisements" :lazy="true" :loading="dataStore.loading" :paginator="true" :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]" :totalRecords="advertisements_total" @page="onPageChange"
    responsive-layout="scroll" :laading="true" :first="offset">
    <Column field="id" header="Nº" />
    <Column field="name" header="Название" />
    <Column field="price" header="Цена" />
    <Column field="category.name" header="Категория" />
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from '@/stores/dataStore';
export default {
  name: "Advertisements",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    advertisements() {
      return this.dataStore.advertisements
    },
    advertisements_total() {
      return this.dataStore.advertisements_total;
    }
  },
  mounted() {
    console.log('advertisements component MOUNTED!');
    this.dataStore.get_advertisements();
    this.dataStore.get_advertisements_total();
    console.log('advertisements=', this.advertisements);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_advertisements(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>
