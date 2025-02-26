<script setup>
import { ref, onMounted } from "vue";
import Car from "./CarLogo.vue";

const users = ref([]);
const headers = ref([]);

const url = "http://localhost:8080/clients/all";

function getUsers() {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("No response!");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

onMounted(() => {
  getUsers()
    .then((data) => {
      users.value = data;
      headers.value = users.value.length > 0 ? Object.keys(users.value[0]) : [];
      console.log(headers.value);
    })
    .catch((error) => {
      console.error("Fetch error.", error);
    });
});
</script>

<template>
  <div class="table-container">
    <h2 style="color: aliceblue">User Info</h2>
    <table class="styled-table">
      <thead>
        <tr>
          <th v-for="key in headers" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.clientId">
          <td v-for="(value, key) in item" :key="key">
            <span v-if="key === 'cars'">
              <Car />
            </span>
            <span v-else>{{ value }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  width: 60%;
  margin: 20px auto;
}

.styled-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px;
  border: 1px solid #ddd;
}

.styled-table th {
  background-color: #4caf50;
  color: white;
}

.styled-table tr:nth-child(even) {
  background-color: #000000;
}

.styled-table tr:hover {
  background-color: #ddd;
}
</style>
