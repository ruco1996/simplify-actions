# simplify-actions

Functions to simplify actions and reducers for a Redux project


## How to create an action
```js
const setUser = createAction('SET USER')
```
- Now u can use it passing or not a payload:

```js
setUser("ruco1996")
```

## How to create an async action

```js
const getAllUsers = createAsyncAction('GET USERS')

getAllUsers.request()   
getAllUsers.success(payload)   
getAllUsers.error(error)     
```
- The createAsyncAction will create the following types if you want to check it
in the redux-devtools
```
GET USERS | REQUEST
GET USERS | SUCCESS
GET USERS | ERROR
```
## How to create a reducer:

```js
export default createReducer(INIT_STATE)
  .on(getAllUsers.request, (state, action) => ({
    ...state,
    loading: true
  }))
  .on(getAllUsers.success, (state, action) => ({
    ...state,
    loading: false,
    data: action.payload
  }))
  .on(getAllUsers.error, (state) => ({
    ...state,
    loading: false,
    data: null
  }))
```

You can create an array to filter by multiple actions
```js
export default createReducer(INIT_STATE)
  .on(getAllUsers.request, (state, action) => ({
    ...state,
    loading: true
  }))
  .on([getAllUsers.success, getAllUsers.error], (state, action) => ({
    ...state,
    loading: false,
  }))

```

## With redux-saga

```js
export default function* usersSagas() {
  yield all([
    takeLatest(getAllUsers.request, onGetAll),
  ])
}
```