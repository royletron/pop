import * as Actions from '../actions/LocationActions';

export default function Locations(state = {
  location: undefined,
  fetching: false
}, action) {
  switch(action.type) {
    case Actions.REQUEST_USER_LOCATION:
      return Object.assign({}, state, {fetching: true})
    case Actions.SUCCESS_USER_LOCATION:
      return Object.assign({}, state, {fetching: false, location: {
        longitude: action.longitude, latitude: action.latitude
      }})
    default: return state;
  }
}
