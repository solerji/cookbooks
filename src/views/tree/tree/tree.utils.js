export function getEditContent (h, data, node) {
  let self = this
  return (
    <span class="ly-visible">
      <el-button
        size="mini"
        type="text"
        on-click={ () => self.close(data, node) }
      >
        <i class="el-icon-folder-delete" title="取消"></i>
      </el-button>
      <el-button
        size="mini"
        type="text"
        on-click={ () => self.editMsg(data, node) }
      >
        <i class="el-icon-folder-checked" title="确认"></i>
      </el-button>
    </span>
  )
}

// 模板树样式JSX，如需根据后台数据隐藏或加入其它图标请在这个位置改动，
// 它的效果来自于树的render-content回调
export function getDefaultContent (h, data, node) {
  let self = this
  return (
    <span class="ly-visible">
      {
        (<span>
          <i class="el-icon-edit" style="color:grey;" on-click={ () => self.editMsg(data, node) } title="编辑"></i>
          {
            data.icon === 'el-icon-folder' &&
            <i class="el-icon-circle-plus-outline" style="color:grey;margin-left: 7px;" on-click={ () => self.append(node, data) } title="添加"></i>
          }
          {
            data.icon !== 'el-icon-folder' &&
            <i class="el-icon-document-copy" style="color:grey;margin-left: 7px;" on-click={ () => self.copy(node, data) } title="复制"></i>
          }
          {
            data.level !== 1 &&
            <i class="el-icon-delete" title="删除" style="color:grey;margin-left: 6px;" on-click={ () => self.remove(node, data) }></i>
          }
        </span>)
      }
    </span>
  )
}
