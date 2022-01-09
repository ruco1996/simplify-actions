import createAction from './createAction'

export function createAsyncAction(type) {
  return {
    request: createAction(`${type} | REQUEST`),
    success: createAction(`${type} | SUCCESS`),
    error: createAction(`${type} | ERROR`)
  }
}
