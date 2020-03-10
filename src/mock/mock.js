import Mock from 'mockjs'
import { tabledata, savedata } from './table/table'
// import tree from './tree/tree'

Mock.mock('/getTable', 'get', tabledata)

Mock.mock('/saveTable', 'get', savedata)
