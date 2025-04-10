const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

// const { defineConfig } = require("@vue/cli-service");
// const webpack = require("webpack"); // 添加这行引入

// module.exports = defineConfig({
//   configureWebpack: {
//     plugins: [
//       new webpack.DefinePlugin({
//         // 现在webpack已定义
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
//         __VUE_OPTIONS_API__: JSON.stringify(true),
//         __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
//       }),
//     ],
//   },
// });
