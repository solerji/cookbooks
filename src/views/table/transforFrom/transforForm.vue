<template>
  <div class="transforTable" ref="transforForm">
    <body class="newTable__tableBody">
      <div class="tableBody__tableHeader">
        <el-col :span="4">
          <el-button
            type="primary"
            size="small"
            :disabled="!staffData.length"
            @click="removeStaff"
            ><i class="el-icon-plus">&nbsp;&nbsp;</i>批量移除</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="addStaff"
            :disabled="!selectedStaffData.length"
            ><i class="el-icon-plus"></i>批量增加</el-button
          >
        </el-col>
        <el-col :span="2" :offset="17">
          <el-button type="primary" size="small" @click="saveIt">保存</el-button>
        </el-col>
      </div>
      <div class="tableBody__table1">
        <el-table
          ref="selectedStaffTable"
          size="small"
          :data="dataTop"
          style="width: 100%;"
          @selection-change="handleSelectedStaffChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            align="center"
            v-for="item in titleTop"
            :key="item.value"
            :prop="item.value"
            :label="item.name"
            width="auto"
          >
          </el-table-column>
          <el-table-column label="分配类别" align="center">
            <template slot-scope="{ row }">
              <el-select
                class="filter-item"
                placeholder="请选择"
                v-model="row.name"
                disabled
              >
                <el-option
                  v-for="item in staffOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                  :check="item.key"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="auto">
            <template slot-scope="scope">
              <span>
                <el-button
                  size="small"
                  @click="clearOne(scope.index, scope.row)"
                  type="primary"
                >
                  移除
                </el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="tableBody__block">
        <span>搜索项共{{ dataBottom.length }}条</span>
      </div>
      <div class="tableBody__table2">
        <el-table
          ref="staffTable"
          size="small"
          :data="dataBottom"
          style="width: 100%;"
          @selection-change="handleStaffChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            align="center"
            v-for="item in titleBottom"
            :key="item.value"
            :prop="item.value"
            :label="item.name"
            width="auto"
          >
          </el-table-column>
          <el-table-column label="分配类别" align="center">
            <template slot-scope="{ row }">
              <el-select
                class="filter-item"
                placeholder="请选择"
                v-model="row.name"
              >
                <el-option
                  v-for="item in staffOptions"
                  :key="item.key"
                  :label="item.display_name"
                  :value="item.key"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="auto">
            <template slot-scope="scope">
              <span>
                <el-button
                  size="small"
                  @click="addOne(scope.index, scope.row)"
                  type="primary"
                >
                  增加
                </el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="placeOnFile__pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </div>
    </body>
  </div>
</template>

<script>
export default {
  name: 'transforForm',
  props: {
    topTitle: Array,
    bottomTitle: Array,
    dataOptions: Array,
    bottomData: Array
  },
  data() {
    return {
      obj: {},
      dataBottom: [],
      titleTop: [],
      titleBottom: [],
      dataTop: [],
      valueTop: '',
      valueBottom: '',
      radio: '',
      pageSizes: [2, 4, 6],
      totalCount: 5,
      pageSize: 2,
      currentPage: 1,
      staffOptions: [],
      staffData: [],
      selectedStaffData: [],
      check: ''
    }
  },
  created() {
    this.titleTop = this.topTitle
    this.titleBottom = this.bottomTitle
    this.dataBottom = this.bottomData
    this.staffOptions = this.dataOptions
  },
  methods: {
    handleSizeChange(val) {
      let that = this
      that.pageSize = val
    },
    handleCurrentChange(val) {
      let that = this
      that.currentPage = val
    },
    // 将下面表格选择项存入staffData中
    handleSelectedStaffChange(rows) {
      console.log(3232, rows)
      this.staffData = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.staffData.push(row)
            this.$emit('staffData', this.staffData)
          }
        })
      }
    },
    // 将上边表格选择项存入selectedStaffData中
    handleStaffChange(rows) {
      console.log(345454, rows)
      this.selectedStaffData = []
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.selectedStaffData.push(row)
            this.$emit('selectedStaffData', this.selectedStaffData)
          }
        })
      }
    },
    // 下边表格选择项移到上边
    addStaff() {
      setTimeout(() => {
        this.$refs['staffTable'].clearSelection()
        this.$refs['selectedStaffTable'].clearSelection()
      }, 0)
      let repeat = false
      this.dataTop.forEach(item => {
        if (
          this.selectedStaffData[0] &&
          item.name === this.selectedStaffData[0].name
        ) {
          repeat = true
          alert('此项已存在！')
        }
      })
      if (repeat === false) {
        this.selectedStaffData.forEach(item => {
          this.dataTop.push(item)
        })
        for (let i = 0; i < this.dataBottom.length; i++) {
          for (let j = 0; j < this.selectedStaffData.length; j++) {
            if (
              this.dataBottom[i] &&
              this.selectedStaffData[j] &&
              this.dataBottom[i].name === this.selectedStaffData[j].name
            ) {
              this.dataBottom.splice(i, 1)
            }
          }
        }
      }
    },
    // 上边表格选择项移到下边
    removeStaff() {
      setTimeout(() => {
        this.$refs['staffTable'].clearSelection()
        this.$refs['selectedStaffTable'].clearSelection()
      }, 0)
      this.staffData.forEach(item => {
        console.log(item)
        this.dataBottom.push(item)
      })
      for (let i = 0; i < this.dataTop.length; i++) {
        for (let j = 0; j < this.staffData.length; j++) {
          if (
            this.dataTop[i] &&
            this.staffData[j] &&
            this.dataTop[i].name === this.staffData[j].name
          ) {
            this.dataTop.splice(i, 1)
          }
        }
      }
    },
    // 单独移除某条内容
    clearOne(index, row) {
      setTimeout(() => {
        this.$refs['staffTable'].clearSelection()
        this.$refs['selectedStaffTable'].clearSelection()
      }, 0)
      let repeat = false
      this.dataBottom.forEach(item => {
        if (row && item.title === row.name) {
          repeat = true
          alert('此项已存在！')
        }
      })
      if (repeat === false) {
        this.dataBottom.push(row)
        for (let i = 0; i < this.dataTop.length; i++) {
          if (this.dataTop[i] && row && this.dataTop[i].title === row.title) {
            this.dataTop.splice(i, 1)
          }
        }
      }
    },
    // 单独添加某条内容
    addOne(index, row) {
      setTimeout(() => {
        this.$refs['staffTable'].clearSelection()
        this.$refs['selectedStaffTable'].clearSelection()
      }, 0)
      this.dataTop.push(row)
      for (let i = 0; i < this.dataBottom.length; i++) {
        if (this.dataBottom[i] && row && this.dataBottom[i].title === row.title) {
          this.dataBottom.splice(i, 1)
        }
      }
    },
    saveIt () {
      console.log(this.dataTop)
    }
  }
}
</script>

<style scoped lang="css">
@import './transforForm.css';
</style>
