import Vue from 'vue'
import Router from 'vue-router'
import Cookbooks from '@/views/Cookbooks'
import Tree from '@/views/tree/Tree'
import Table from '@/views/table/Table'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Cookbooks',
      component: Cookbooks
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Tree
    },
    {
      path: '/table',
      name: 'Table',
      component: Table
    }
  ]
})