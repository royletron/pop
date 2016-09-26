import { combineReducers } from 'redux'

import Artists from './Artists'
import Locations from './Locations';

const rootReducer = combineReducers({
  Artists,
  Locations
})

export default rootReducer
