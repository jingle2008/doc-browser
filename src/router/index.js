import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import DocumentBrowser from '@/components/DocumentBrowser';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/docview',
      name: 'DocumentBrowser',
      component: DocumentBrowser,
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
  ],
});
