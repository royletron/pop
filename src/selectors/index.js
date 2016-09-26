import { createSelector } from 'reselect';

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

const getArtists = (state) => {
  if(state.Locations.location) {
    return state.Artists.artists.map(function(artist) {
      return Object.assign(artist, {distance: distance(state.Locations.location.latitude, state.Locations.location.longitude, artist.latitude, artist.longitude)})
    })
  } else {
    return state.Artists.artists
  }
}
const getFilters = (state) => state.Artists.filter
const getOrder = (state) => state.Artists.order

export const filterArtists = createSelector(
  [getArtists, getFilters],
  (artists, filters) => artists.filter(function(artist) {
    var good = true;
    if(filters.gender && artist.gender !== filters.gender) {
      good = false;
    } else if(filters.maxAge && artist.age > filters.maxAge) {
      good = false;
    } else if(filters.minAge && artist.age < filters.minAge) {
      good = false;
    } else if(filters.maxRate && artist.rate > filters.maxRate) {
      good = false;
    } else if(filters.minRate && artist.rate < filters.minRate) {
      good = false;
    }
    return good;
  })
)

export const orderFilteredArtists = createSelector(
  [filterArtists, getFilters, getOrder],
  (artists, filters, order) => {
    if(order) {
      return artists.sort(function(a, b) {
        if(order.direction === 'desc')
          return a[order.field] - b[order.field]
        else
          return b[order.field] - a[order.field]
      })
    } else {
      if(filters.maxAge && filters.minAge) {
        var midpoint = (filters.minAge + (filters.maxAge - filters.minAge)/2)
        return artists.sort(function(a, b) {
          return Math.abs(a.age - midpoint) - Math.abs(b.age - midpoint)
        })
      }
      return artists
    }
  }
)
