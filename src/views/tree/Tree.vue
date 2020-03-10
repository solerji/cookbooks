<template>
  <div class="tree">
    <div>
      可增删改复制拖拽的树
      <Commontree></Commontree>
    </div>
  </div>
</template>

<script>
import Commontree from './tree/tree'
export default {
  name: 'Tree',
  data() {
    return {}
  },
  components: {
    Commontree
  }
}
</script>
