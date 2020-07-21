import ajax from '../utils/ajax'
import { HOST } from '../constants'

export function getCode(params) {
  return ajax.post(`${HOST}/user/getCode`, { data: params })
}