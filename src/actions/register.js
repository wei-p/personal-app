import * as api from '../api/register'

export function getCode(payload={}) {
  return async () => {
    console.log('test')
    const result = await api.getCode(payload)
    console.log(result)
  }
}