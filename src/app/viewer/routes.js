import * as components from './components';

export default [
  {
    path: '/:doc?',
    component: components.default,
    name: 'DocBrowser',
    props: true,
  },
];
