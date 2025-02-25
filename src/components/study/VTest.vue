<template>
  <div>
    <p>V-if</p>
    <div v-if="flag" class="inhalte">Flag ist true</div>
    <div v-else class="inhalte">Flag ist false</div>
  </div>

  <div>
    <p>v-for</p>
    <ul>
      <li
        @click="callNewHandler(item.title)" 
        v-for="item in newList"
        :key="item.id"
        class="inhalte"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>

  <div>
    <p>v-on:click</p>
    <button v-on:click="count += 1">Click {{ count }}</button>
    <button @click="clickHandle">Click {{ times }}</button>
  </div>

  <div>
    <p>v-model</p>
    <input v-model.trim="username">
    <p >Your username : {{ username }}</p>
    <input v-model.lazy="username1">
    <p >Your username lazy : {{ username1 }}</p>
  </div>

</template>

<script scoped>
export default {
  controller() {
    return {
      flag: true,
    };
  },
  data() {
    //data这里可以初始化数据
    return {
      count: 1,
      times: 0,
      username : "",
      username1 : "",
      newList: [
        {
          id: 1001,
          title: "New 1",
        },
        {
          id: 1002,
          title: "New 2",
        },
        {
          id: 1003,
          title: "New 3",
        },
      ],
    };
  },
  methods: {
    //初始化方法
    callNewHandler(newsInhalt) {
      console.log(newsInhalt);
    },
    clickHandle() {
      this.times += 1;
    }
  },
};
</script>

<style>
p {
  top: 20px;
  bottom: 30px;
  color: aqua;
  font-size: 50px;
  font-weight: bolder;
}

.inhalte {
  font-size: 25px;
  color: antiquewhite;
}
</style>
