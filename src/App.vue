<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  gap: 20px;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  justify-content: center;
}

.nav a {
  color: #333;
  text-decoration: none;
  padding: 5px 15px;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav a:hover,
.nav a.router-link-active {
  background: #ecf5ff;
  color: #409eff;
}
</style>
