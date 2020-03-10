<template>
  <div class="tableCompent">
    <div class="transforForm">
      可移动单条和批量移动条目的表格
      <TransforForm
        :topTitle="topTitle"
        :bottomTitle="bottomTitle"
        :bottomData="bottomData"
        :dataOptions="dataOptions"
      ></TransforForm>
    </div>
    <div></div>
  </div>
</template>

<script>
import TransforForm from './transforFrom/transforForm'
export default {
  name: 'Table',
  data() {
    return {
      bottomTitle: [
        {
          name: '测试名',
          value: 'title'
        },
        {
          name: '测试数据',
          value: 'savedate'
        }
      ],
      topTitle: [
        {
          name: '测试名',
          value: 'title'
        },
        {
          name: '测试数据',
          value: 'savedate'
        }
      ],
      bottomData: [
        {
          savedate: '11',
          title: '测试名'
        },
        {
          savedate: '12',
          title: '测试名2'
        },
        {
          savedate: '13',
          title: '测试名3'
        }
      ],
      dataOptions: [
        { key: 1, display_name: '测试一' },
        { key: 2, display_name: '测试二' }
      ],
      topData: []
    }
  },
  components: {
    TransforForm
  }
}
</script>
