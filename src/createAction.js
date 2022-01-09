const identity = value => value
const isNull = value => value === null
const isFunction = value => typeof value === 'function'

export function createAction(type, payloadCreator = identity, metaCreator) {
  const finalPayloadCreator =
    isNull(payloadCreator) || payloadCreator === identity
      ? identity
      : (head, ...args) => (head instanceof Error ? head : payloadCreator(head, ...args))

  const hasMeta = isFunction(metaCreator)
  const typeString = type.toString()

  const actionCreator = (...args) => {
    const payload = finalPayloadCreator(...args)
    const action = { type }

    if (payload instanceof Error) action.error = true
    if (payload !== undefined) action.payload = payload
    if (hasMeta) action.meta = metaCreator(...args)

    return action
  }

  actionCreator.toString = () => typeString
  return actionCreator
}
