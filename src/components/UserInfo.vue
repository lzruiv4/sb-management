<script setup>
const getUsers = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error("404"));
      }
    };
    // const users = new Image();
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};

getUsers(
    // "https://cdn.pixabay.com/photo/2023/12/22/16/29/sheet-music-8463988_1280.jpg"
  "http://localhost:8080/clients/all"
).then(
  function (data) {
    console.log(data);
  },
  function (error) {
    console.log(error);
  }
);
</script>

<template>
  <div id="users" style="color: aliceblue">waiting</div>
</template>

<style scoped></style>
