import Vue from 'vue';
import Router from 'vue-router';
import HomeView from '@/components/HomeView';
import DocumentView from '@/components/DocumentView';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/docview',
      name: 'DocumentView',
      component: DocumentView,
      props: true,
    },
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
  ],
});
