import { request } from './axios'

export function saveTable() {
  return request({
    method: 'get',
    url: '/saveTable'
  })
}

export function getTable() {
  return request({
    method: 'get',
    url: '/getTable'
  })
}
