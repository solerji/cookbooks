import Mock from 'mockjs'
import { tabledata } from './table/table'
import { tree } from './tree/tree'

Mock.mock('/getTable', 'get', tabledata)
Mock.mock('/getTree', 'get', tree)
