<template>
  <div id="app">
    <b-container fluid>
      <b-navbar toggleable="md" type="dark" variant="dark" fixed="top">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="/">
          <icon name="bomb" scale="2" />
          Document Browser
        </b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item v-b-modal.config>
              <icon name="cog" scale="2" />       
            </b-nav-item>
            <b-nav-item
              href="https://github.com/jingle2008/doc-browser"
              target="_blank">
              <icon name="github" scale="2" />
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <config-view id="config" />
      <notify-view />
      <loading-view />
      <router-view />
    </b-container>
  </div>
</template>

<script>
import 'vue-awesome/icons/bomb';
import 'vue-awesome/icons/github';
import 'vue-awesome/icons/cog';
import Icon from 'vue-awesome/components/Icon';
import { NotifyView, ConfigView, LoadingView } from './shared/components';

export default {
  name: 'app',
  components: {
    Icon,
    NotifyView,
    ConfigView,
    LoadingView,
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

.clickable{
  cursor: pointer;
}
</style>
