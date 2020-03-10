<template>
  <div>
    <el-dialog
      title="确认要删除此项吗？"
      :visible.sync="delDialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <span slot="footer" align="center">
        <el-button size="small" @click="delDialogVisible = false">
          取消
        </el-button>
        <el-button size="small" type="primary" @click="delSelect">
          确认
        </el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加文件夹还是文件？"
      :visible.sync="addDialogVisible"
      width="30%"
      :append-to-body="true"
    >
      <span slot="footer" align="center">
        <el-button size="small" @click="selectFolder">
          文件夹
        </el-button>
        <el-button size="small" type="primary" @click="selectDoc">
          文件
        </el-button>
      </span>
    </el-dialog>
    <div class="ly-tree-container">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :highlight-current="true"
        default-expand-all
        :expand-on-click-node="false"
        draggable
        :render-content="renderContent"
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getEditContent, getDefaultContent } from './tree.utils.js'
export default {
  name: 'ly-tree',
  props: {
    commontreeData: Array
  },
  data() {
    return {
      treeData: [],
      isEdit: false,
      addDialogVisible: false,
      edit_name: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      select_id: null,
      select_level: null,
      select_node: null,
      delDialogVisible: false,
      oldTemplateid: '',
      type: ''
    }
  },
  created() {
    this.treeData = this.commontreeData
  },
  methods: {
    // 复制模板
    copy(node, data) {
      if (!this.isEdit) {
        const newChild = {
          id: data.id++,
          name: data.name + 'copy',
          level: data.level,
          icon: data.icon,
          isEdit: false
        }
        if (!node.parent.data.children) {
          this.$set(data, 'children', [])
        }
        node.parent.data.children.unshift(newChild)
      } else {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
      }
    },
    // 新增
    append(node, data, e) {
      e = event || window.event
      this.type = ''
      this.addDialogVisible = true
      e.stopPropagation()
      if (!this.isEdit) {
        this.select_id = data.id
        this.edit_name = ''
        const newChild = {
          name: '',
          level: data.level + 1,
          isEdit: true
        }
        this.isEdit = true
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.unshift(newChild)
      } else {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
      }
    },
    remove(node, data, e) {
      e = event || window.event
      e.stopPropagation()
      if (this.isEdit) {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
        return
      }
      this.select_node = node
      this.delDialogVisible = true
    },
    // 删除
    delSelect() {
      this.delItem(this.treeData, { id: this.select_node.data.id })
      this.delDialogVisible = false
      this.$notify({
        type: 'success',
        title: '操作提示',
        message: '删除成功!',
        duration: 2000
      })
    },
    // 数据处理（删除）
    delItem(data, payload) {
      let that = this
      that.dataLoading = true
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === payload.id) {
          data.splice(i, 1)
          break
        }
        if (data[i].children && data[i].children.length) {
          that.delItem(data[i].children, payload)
        }
      }
    },
    addItem(data, payload) {
      let addObj = {}
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === payload.id) {
          addObj.id = payload.id++
          addObj.name = payload.name
          addObj.level = data[i].level + 1
          addObj.children = []
          addObj.icon = payload.icon
          data[i].children.unshift(addObj)
          break
        }

        if (data[i].children && data[i].children.length) {
          this.addItem(data[i].children, payload)
        }
      }
    },
    // 数据处理（修改）
    updateItem(data, payload) {
      let that = this
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === payload.id) {
          data[i].name = payload.name
        }
        if (data[i].children && data[i].children.length) {
          that.updateItem(data[i].children, payload)
        }
      }
    },
    update(node, data, e) {
      e = event || window.event
      e.stopPropagation()
      if (this.isEdit) {
        this.$notify({
          type: 'error',
          title: '操作提示',
          message: '有正在编辑或添加的选项未完成！',
          duration: 2000
        })
        return
      }
      this.select_id = data.id
      this.select_level = data.level
      this.edit_name = data.name
      this.isEdit = true
    },
    editMsg(data, node, e) {
      e = event || window.event
      e.stopPropagation()
      if (this.edit_name.replace(/^\s+|\s+$/g, '')) {
        if (!data.id) {
          let virtualNode = node.parent
          let icon = ''
          if (node.parent.data.icon === 'el-icon-folder') {
            if (this.type === 2) {
              icon = 'el-icon-document'
            } else if (this.type === 1) {
              icon = 'el-icon-folder'
            }
              let params = {
              name: this.edit_name,
              id: virtualNode.data.id,
              icon: icon
            }
            this.addItem(this.treeData, params)
            virtualNode.data.children.forEach((item, i) => {
              if (!item.id) {
                virtualNode.data.children.splice(i, 1)
              }
            })
            this.isEdit = false
            this.select_id = null
            this.select_level = null
            this.$notify({
              type: 'success',
              title: '操作提示',
              message: '添加成功！',
              duration: 2000
            })
            return
          }
        }
        let params = {
          name: this.edit_name,
          id: data.id
        }
        this.updateItem(this.treeData, params)
        this.isEdit = false
        this.select_id = null
        this.select_level = null
        this.$notify({
          type: 'success',
          title: '操作提示',
          message: '编辑成功！',
          duration: 2000
        })
      }
    },
    close(data, node, e) {
      e = event || window.event
      e.stopPropagation()
      if (!data.id) {
        node.parent.data.children.forEach((item, i) => {
          if (!item.id) {
            node.parent.data.children.splice(i, 1)
          }
        })
      }
      this.select_id = null
      this.select_level = null
      this.edit_name = data.name
      this.isEdit = false
    },

    nameChange(e) {
      e = event || window.event
      e.stopPropagation()
      this.edit_name = e.target.value
    },

    isSelect(data) {
      return data.id === this.select_id && 
             data.level === this.select_level
    },
    // 编辑文字时不能为空
    renderContent(h, { node, data }) {
      let icon = data.icon
      return (
        <span class="ly-tree-node">
          {(this.isEdit === true && this.isSelect(data)) || data.isEdit  
            ? <input
              placeholder="名称不能为空"
              class="ly-edit__text"
              on-keyup={() => this.nameChange()}
              value={this.edit_name}
            />
           :
            <span>
              <i class={icon} style="color:#2293fb;font-size:20px;"></i>
              <span class="name" style="margin-left:15px;">
                {data.name}
              </span>
            </span>
          }
          {(this.isEdit === true && this.isSelect(data)) || data.isEdit
            ? getEditContent.call(this, h, data, node)
            : getDefaultContent.call(this, h, data, node)}
        </span>
      )
    },
    // 模板只能移入文件夹而不能移入文件下级
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.icon !== 'el-icon-folder') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    // 首个文件夹不可以移动
    allowDrag(draggingNode) {
      return draggingNode.data.name.indexOf('文件夹1') === -1
    },
    selectFolder () {
      this.type = 1
      this.addDialogVisible = false
    },
    selectDoc () {
      this.type = 2
      this.addDialogVisible = false
    }
  }
}
</script>

<style scoped lang="css">
@import './tree.css';
</style>
