<template>
  <div class="tree">
    <div>
      可增删改复制拖拽的树
      <Commontree :commontreeData="commontreeData"></Commontree>
    </div>
  </div>
</template>

<script>
import Commontree from './tree/tree'
export default {
  name: 'Tree',
  data() {
    return {
      commontreeData: [
        {
          id: 1,
          name: '文件夹1',
          level: 1,
          icon: 'el-icon-folder',
          children: [
            {
              id: 2,
              name: '文件夹2',
              level: 2,
              icon: 'el-icon-folder',
              children: [
                {
                  id: 3,
                  name: '内容一',
                  level: 3,
                  icon: 'el-icon-document',
                  children: []
                }
              ]
            },
            {
              id: 4,
              name: '内容2',
              level: 2,
              icon: 'el-icon-document',
              children: []
            }
          ]
        }
      ]
    }
  },
  components: {
    Commontree
  }
}
</script>
