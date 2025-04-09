<template>
  <div class="talk">
    <!-- <button @click="getSomething">Get a love talk.</button> -->
    <ul>
      <li v-for="talk in talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Count">
import { reactive } from "vue";
// import axios from "axios";
let talkList = reactive([
  { id: "001", title: "sdfsags" },
  { id: "002", title: "sdfsags2" },
  { id: "003", title: "sdfsags3" },
]);
// async function getSomething() {
//   let result = await axios.get(
//     "https://api.uomg.com/api/rand.qinghua?format=json"
//   );
//   console.log(result);
// }
</script>
<style lang="css" scoped>
.talk {
  background-color: pink;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
