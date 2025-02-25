<script>
var $firstname = "zhangsan"; // 合法
var _lastname = "lin"; //合法

alert($firstname, _lastname);

/**
 * 数据类型
 * 比java多了 undefined
 *
 * var hello = undefined  代表没有的意思
 *
 * ES6后多了 Symbol 和 BigInt
 */

// 对象类型
var user = {
  firstname: "",
  surname: "",
  age: 300,
  getAge: function () {
    console.log(300);
  },
};

let { firstname, lastname } = user;
console.log(firstname, lastname);

console.log(typeof user.age); // Number
console.log(typeof user.firstname); // String

/**
 * ++num 与 num++ 的区别
 * 前者是先运算再自值，后者是先运算再自增
 */
var num1 = 10;
var num2 = 20;
console.log(++num1); // 输出11
console.log(num2++); //先输出20，然后num2在变成21

/**
 * Js比java多了两种运算符
 * === 严格运算等于   这个跟java的==一致，数值相同的同时，还需要类型也相同
 * == 可以比较不同类型的值，例如 10 == "10" 会返回true
 * !== 严格运算不等
 *
 */
console.log(10 == "10"); // 返回true
console.log(10 === "10"); // 返回false

/**
 * undefined, null, false, 0, NaN, ""
 * 对上面的几个值取反，均为true，其他的值取反都为false
 *
 */
console.log(!undefined); // true

var flag = true;
if (flag) {
  console.log("you are right");
}

var timers = 100;
while (timers >= 0) {
  console.log(timers--);
}

/**
 * 数组可以随便放，任意类型
 * 数组变大可以使用push()方法   push(10, 20),可以用逗号隔开
 * pop()用于删除最后一个元素
 * shift() 删除第一个元素
 * unshift() 添加元素到第一个元素，也可以同时添加多个
 * join(字符串) 根据给定的字符串将所有的元素串起来并返回，默认是逗号
 * concat() 能合并两个数组， 被调用的数组不会改变数组
 */
var arr = [10, "dddd", [10, 11]];
arr.push(30, 40);
for (var i in arr) {
  console.log(i);
}

/**
 * function functionsname(para1, para2 ..) {}
 * para1 跟 para2 不用声明
 *
 * 还能对其更改为箭头函数
 * 如果没有参数，还是需要加一个()来声明
 */
var sum = function add(x, y) {
  return x + y;
}

var sum1 = (x, y) => x+y;

console.log(sum , sum1);

/**
 * 日期 Date.now()  时间戳
 * getDay()
 * getMonth()
 * getYear()
 */

/**
 * DOM 概述  Document Object Model 文档对象模型
 * DOM只是一个接口规范
 * DOM的最小节点是node
 *
 * 节点的类型有7类
 * 1. Document ： 整个文档树的顶层节点
 *   其实就是整个HTML文档  如index.html
 * 2. DocumentType ： doctype标签
 * 3. Element ： 网页的各种HTML标签
 * 4. Attribute ： 网页元素的属性（class="name"）
 * 5. Text : 标签之间的或标签包含的文本
 * 6. Comment ： 注释
 * 7. DocumentFragment ： 文档的片段
 *
 */

var username = document.getElementById("username");
username.oninput = function (e) {
  console.log(e.target.value);
};
</script>

<template>
  <input id="username" type="text" />
</template>
