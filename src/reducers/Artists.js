import * as Actions from '../actions/ArtistActions';
import {SUCCESS_USER_LOCATION} from '../actions/LocationActions';
import { artists } from '../data/artists.json';

export default function Artists(state={
  filter: {
    minAge: undefined,
    maxAge: undefined,
    minRate: undefined,
    maxRate: undefined,
    gender: undefined
  },
  order: undefined,
  artists: artists
}, action) {
  switch(action.type) {
    case Actions.UPDATE_ARTIST_FILTERS:
      var filters = Object.assign({}, state.filter, action.filters)
      return Object.assign({}, state, {filter: filters});
    case Actions.UPDATE_ARTIST_ORDER:
      return Object.assign({}, state, {order: action.order});
    default:
      return state;
  }
}
