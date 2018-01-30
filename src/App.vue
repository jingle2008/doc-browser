<template>
  <div id="app">
    <b-container fluid>
      <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">
          <icon name="bomb" scale="2"></icon>Document Browser
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item
              href="https://github.com/jingle2008/doc-browser"
              target="_blank">
              <icon name="github" scale="2"></icon>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import 'vue-awesome/icons/bomb';
import 'vue-awesome/icons/github';
import Icon from 'vue-awesome/components/Icon';

export default {
  name: 'app',
  components: {
    Icon,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 80px;
}
</style>
