'use strict';

import React from 'react';
import Ranger from '../src/components/Ranger';
import renderer from 'react-test-renderer';

it('should display a ranger', () => {
  const component = renderer.create(
    <Ranger min={16} max={74} step={1} name='Age' />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('should not update the ranger when min range is decreased', () => {
  const component = renderer.create(
    <Ranger min={16} max={74} step={1} name='Age' />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component.update(<Ranger min={10} max={74} step={1} name='Age' />)
  expect(tree).toMatchSnapshot();
})

it('should update the ranger when min range is increased', () => {
  const component = renderer.create(
    <Ranger min={16} max={74} step={1} name='Age' />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component.update(<Ranger min={22} max={74} step={1} name='Age' />)
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('should not update the ranger when max range is increased', () => {
  const component = renderer.create(
    <Ranger min={16} max={74} step={1} name='Age' />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component.update(<Ranger min={16} max={100} step={1} name='Age' />)
  expect(tree).toMatchSnapshot();
})

it('should update the ranger when max range is decreased', () => {
  const component = renderer.create(
    <Ranger min={16} max={74} step={1} name='Age' />
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  component.update(<Ranger min={16} max={60} step={1} name='Age' />)
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
