<template>
  <div class="Cookbooks">
    <div class="font">插件分类</div>
    <el-row>
      <el-col :span="3" :offset="1">
        <router-link to="/table"
          ><div class="table">
            <el-tag>表格区</el-tag>
          </div></router-link
        >
      </el-col>
      <el-col :span="3" :offset="1">
        <router-link to="/tree"
          ><div class="commontree">
            <el-tag>树</el-tag>
          </div></router-link
        >
      </el-col>
      <el-col :span="3" :offset="1">
        <div class="other">
          <el-tag>其他</el-tag>
        </div>
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

<style lang="css">
@import url('./Cookbooks.css');
</style>
