// based on https://github.com/TehShrike/deepmerge/tree/3c39fb376158fa3cfc75250cfc4414064a90f582/test
// MIT License
// Copyright (c) 2012 - 2022 James Halliday, Josh Duff, and other contributors of deepmerge

import deepmerge from '../index.js'
import { test } from 'tape'

const merge = deepmerge({ all: true })

test('return an empty object if first argument is an array with no elements', function (t) {
  t.same(merge(), {})
  t.end()
})

test('Work just fine if first argument is an array with least than two elements', function (t) {
  const actual = merge({ example: true })
  const expected = { example: true }
  t.same(actual, expected)
  t.end()
})

test('execute correctly if options object were not passed', function (t) {
  t.doesNotThrow(merge.bind(null, { example: true }, { another: '123' }))
  t.end()
})

test('execute correctly if options object were passed', function (t) {
  t.doesNotThrow(merge.bind(null, { example: true }, { another: '123' }))
  t.end()
})

test('invoke merge on every item in array should result with all props', function (t) {
  const firstObject = { first: true }
  const secondObject = { second: false }
  const thirdObject = { third: 123 }
  const fourthObject = { fourth: 'some string' }

  const mergedObject = merge(firstObject, secondObject, thirdObject, fourthObject)

  t.ok(mergedObject.first === true)
  t.ok(mergedObject.second === false)
  t.ok(mergedObject.third === 123)
  t.ok(mergedObject.fourth === 'some string')
  t.end()
})

test('invoke merge on every item in array with clone should clone all elements', function (t) {
  const firstObject = { a: { d: 123 } }
  const secondObject = { b: { e: true } }
  const thirdObject = { c: { f: 'string' } }

  const mergedWithClone = merge(firstObject, secondObject, thirdObject)

  t.not(mergedWithClone.a, firstObject.a)
  t.not(mergedWithClone.b, secondObject.b)
  t.not(mergedWithClone.c, thirdObject.c)

  t.end()
})

test('invoke merge on every item in array without clone should clone all elements', function (t) {
  const firstObject = { a: { d: 123 } }
  const secondObject = { b: { e: true } }
  const thirdObject = { c: { f: 'string' } }

  const mergedWithoutClone = merge(firstObject, secondObject, thirdObject)

  t.not(mergedWithoutClone.a, firstObject.a)
  t.not(mergedWithoutClone.b, secondObject.b)
  t.not(mergedWithoutClone.c, thirdObject.c)

  t.end()
})
