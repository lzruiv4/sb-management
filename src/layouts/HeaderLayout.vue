<template>
  <header class="header">
    <div class="logo"><img src="/src/assets/images/logo.png" class="logo-image" /></div>
    <nav class="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Product</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact us</a></li>
      </ul>
    </nav>
    <div class="user-logo">
      <img src="/src/assets/icons/user-icon.svg" class="user-image" alt="user" />
    </div>
  </header>
</template>

<script lang="ts" setup name="HeaderLayout">
// export default {}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin: 0 20px;
  width: 100%;
  height: 100px;
  background-color: #f9f2e0;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.1),
    0 6px 16px rgba(0, 0, 0, 0.06);
  border-radius: 20px;

  .logo {
    // font-weight: bold;
    // font-size: 24px;
    margin: 5px;
    width: 90px;
    height: 90px;

    .logo-image {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    flex: 1;
    margin: 0 40px;

    ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      justify-content: flex-start;

      li {
        margin: 0 15px;

        a {
          text-decoration: none;
          font-size: 30px;
          font-weight: bolder;
          color: #1660ab;
          // font-weight: 500;
          transition: color 0.3s;

          &:hover {
            color: #f22ac3;
          }
        }
      }
    }
  }

  .user-logo {
    width: 90px;
    height: 90px;

    .user-image {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
