import React from 'react';
import Ranger from '../../components/Ranger';
import classNames from 'classnames';
import {connect} from 'react-redux';

import {updateArtistFilters, updateArtistOrder} from '../../actions/ArtistActions';
import {requestUserLocation} from '../../actions/LocationActions';
import {orderFilteredArtists} from '../../selectors';
import styles from './index.css';

import _ from 'underscore';

const mapStateToProps = (state) => {
  return {
    artists: orderFilteredArtists(state),
    filters: state.Artists.filters,
    order: state.Artists.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilters: (filters) => {
      dispatch(updateArtistFilters(filters))
    },
    updateOrder: (order) => {
      dispatch(updateArtistOrder(order));
    },
    getLocation: () => {
      dispatch(requestUserLocation());
    }
  }
}

class AppComponent extends React.Component {
  onAgeRangerChange = (min, max) => {
    this.props.updateFilters({
      minAge: min,
      maxAge: max
    })
  }
  onRateRangerChange = (min, max) => {
    this.props.updateFilters({
      minRate: min,
      maxRate: max
    })
  }
  onGenderChange = (event) => {
    this.props.updateFilters({
      gender: event.target.value
    })
  }
  sortColumn (column) {
    this.props.updateOrder({
      field: column,
      direction: this.props.order && this.props.order.field === column ? this.props.order.direction === 'desc' ? 'asc' : 'desc' : 'desc'
    })
  }
  componentDidMount () {
    this.props.getLocation();
  }
  render () {
    return (
      <div className={classNames(styles.this)}>
        <div className={classNames(styles.filters)}>
          <div style={{'padding': '0px 10px'}}>
            <h2>Filter Artists</h2>
            <Ranger min={16} max={74} step={1} onChange={_.debounce(this.onAgeRangerChange, 100)} name='Age' />
            <Ranger min={0} max={40} step={0.1} onChange={_.debounce(this.onRateRangerChange, 100)} name='Rate' />
            <div>
              <h2>Gender</h2>
              <input type="radio" onChange={this.onGenderChange} name="gender" value="M" /> Male<br />
              <input type="radio" onChange={this.onGenderChange} name="gender" value="F" /> Female<br />
            </div>
          </div>
        </div>
        <div className={classNames(styles.data)}>
          <div style={{'padding': '0px 10px'}}>
            <table>
              <thead>
                <tr>
                  <th>uuid</th>
                  <th>gender</th>
                  <th><a onClick={this.sortColumn.bind(this, 'age')}>{this.props.order && this.props.order.field === 'age' ? this.props.order.direction === 'desc' ? '⬇' : '⬆' : ''} age</a></th>
                  <th>distance (km)</th>
                  <th><a onClick={this.sortColumn.bind(this, 'rate')}>{this.props.order && this.props.order.field === 'rate' ? this.props.order.direction === 'desc' ? '⬇' : '⬆' : ''} rate</a></th>
                </tr>
              </thead>
              <tbody>
                {this.props.artists.map(function(row, idx){
                  return (
                    <tr key={`artist_${row.uuid}`}>
                      <td>{row.uuid}</td>
                      <td>{row.gender}</td>
                      <td>{row.age}</td>
                      <td>{row.distance ?  Math.floor(row.distance*10)/10 : 'n/a'}</td>
                      <td>{row.rate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

let App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

export default App;
