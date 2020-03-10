let tree = {
  commontreeData: [
    {
      id: 11,
      name: '文件夹1',
      level: 1,
      icon: 'el-icon-folder',
      children: [
        {
          id: 21,
          name: '文件夹2',
          level: 2,
          icon: 'el-icon-folder',
          children: [
            {
              id: 31,
              name: '内容一',
              level: 3,
              icon: 'el-icon-document',
              children: []
            }
          ]
        },
        {
          id: 41,
          name: '内容2',
          level: 2,
          icon: 'el-icon-document',
          children: []
        }
      ]
    }
  ]
}

export { tree }
