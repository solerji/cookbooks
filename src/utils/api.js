import { request } from './axios'

export function getTree() {
  return request({
    method: 'get',
    url: '/getTree'
  })
}

export function getTable() {
  return request({
    method: 'get',
    url: '/getTable'
  })
}
