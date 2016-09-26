export const UPDATE_ARTIST_FILTERS = 'UPDATE_ARTIST_FILTERS';
export function updateArtistFilters (filters) {
  return {
    type: UPDATE_ARTIST_FILTERS,
    filters
  }
}

export const UPDATE_ARTIST_ORDER = 'UPDATE_ARTIST_ORDER';
export function updateArtistOrder (order) {
  return {
    type: UPDATE_ARTIST_ORDER,
    order
  }
}
