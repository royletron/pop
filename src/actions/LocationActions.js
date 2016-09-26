export const REQUEST_USER_LOCATION = 'REQUEST_USER_LOCATION';
export function requestUserLocation () {
  return function(dispatch) {
    dispatch({type: REQUEST_USER_LOCATION})
    var geoSuccess = function(position) {
      dispatch(successUserLocation(position.coords.longitude, position.coords.latitude));
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
  }
}

export const SUCCESS_USER_LOCATION = 'SUCCESS_USER_LOCATION';
export function successUserLocation (longitude, latitude) {
  return {
    type: SUCCESS_USER_LOCATION,
    longitude,
    latitude
  }
}
