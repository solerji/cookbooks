<template>
  <div class="Cookbooks">
    <div class="font">插件分类</div>
    <el-row>
      <el-col :span="4">
        <router-link to="/table"><div class="table">表格区</div></router-link>
      </el-col>
      <el-col :span="4">
        <router-link to="/tree"><div class="commontree">树</div></router-link>
      </el-col>
      <el-col :span="4">
        <div class="other">其他（会不断扩充）</div>
      </el-col>
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Cookbooks'
}
</script>

<style>
.table {
  background-color: aqua;
  box-sizing: border-box;
}
.commontree {
  background-color: brown;
  box-sizing: border-box;
}
.other {
  background-color: cadetblue;
  box-sizing: border-box;
}
</style>
