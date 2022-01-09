export function createReducer(initialState, initialHandlers = {}) {
  const handlers = {
    ...initialHandlers
  }

  const rootReducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      const reducer = handlers[action.type]
      return reducer(state, action)
    } else {
      return state
    }
  }

  const reducerHandler = (singleOrMultipleActions, reducer) => {
    const creatorsAndTypes = Array.isArray(singleOrMultipleActions)
      ? singleOrMultipleActions
      : [singleOrMultipleActions]

    const newHandlers = {}

    creatorsAndTypes.forEach(action => (newHandlers[action().type] = reducer))

    return createReducer(initialState, {
      ...handlers,
      ...newHandlers
    })
  }

  const chain = Object.assign(rootReducer, {
    handlers: { ...handlers },
    on: reducerHandler
  })

  return chain
}
