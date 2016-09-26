'use strict';

import * as Actions from '../src/actions/ArtistActions';

it('should create an action to update the filters', () => {
  const expectedAction = {
    type: Actions.UPDATE_ARTIST_FILTERS,
    filters: {
      minAge: 16,
      maxAge: 20
    }
  }
  expect(Actions.updateArtistFilters({minAge: 16, maxAge: 20})).toEqual(expectedAction);
})

it('should create an action to update the order', () => {
  const expectedAction = {
    type: Actions.UPDATE_ARTIST_ORDER,
    order: {
      field: 'age',
      direction: 'desc'
    }
  }
  expect(Actions.updateArtistOrder({field: 'age', direction: 'desc'})).toEqual(expectedAction);
})
