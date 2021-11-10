export const __ACCESS_CHECK = store => next => async action => {
  console.log("Middleware __ACCESS_CHECK", action )
	next(action);
}