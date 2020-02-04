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

<style>
.table {
  background-color: rgb(243, 204, 130);
  border-radius: 20px;
  height: 100%;
  font-size: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.commontree {
  background-color: darkseagreen;
  border-radius: 20px;
  font-size: 20px;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.other {
  background-color: cadetblue;
  border-radius: 20px;
  font-size: 20px;
  height: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.font {
  margin-bottom: 2%;
}
.el-tag {
  background-color: rgba(255, 247, 247, 0.007);
  border-color: rgba(255, 247, 247, 0.007);
  color: rgb(247, 242, 242);
}
</style>
