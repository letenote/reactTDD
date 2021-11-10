export const __LOGGER = store => next => action => {
  console.log("Middleware __LOGGER", action )
  next(action)
}