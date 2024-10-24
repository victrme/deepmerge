# @victr/deepmerge

[![NPM version](https://img.shields.io/npm/v/@victr/deepmerge.svg?style=flat)](https://www.npmjs.com/package/@victr/deepmerge)

This is an ESM only version of [@fastify/deepmerge](https://github.com/fastify/deepmerge).  
Merges the enumerable properties of two or more objects deeply. Fastest implementation of deepmerge, see section 'Benchmarks'.

### Install

```
npm i @victr/deepmerge
```

### Usage

The module exports a default function, which provides a function to deepmerge Objects. Also a deepmerge, and a deepmergeAll shorthand.

```
deepmerge(options)(...objects)
deepmerge(object1, object2)
deepmergeAll(...objects)
```

`options` is optional and can contain following values

-   `symbols` (`boolean`, optional) - should also merge object-keys which are symbols, default is false
-   `all` (`boolean`, optional) - merges all parameters, default is false
-   `mergeArray` (`function`, optional) - provide a function, which returns a function to add custom array merging function
-   `cloneProtoObject` (`function`, optional) - provide a function, which must return a clone of the object with the prototype of the object

```js
import deepmerge from "@victr/deepmerge"

const result1 = deepmerge()({ a: "value" }, { b: 404 })
const result2 = deepmerge({ all: true })({ a: "value" }, { b: 404 }, { a: 404 })

console.log(result1) // {a: 'value',  b: 404 }
console.log(result2) // {a: 404,  b: 404 }
```

or without curry  

```js
import { deepmergeAll, deepmerge } from "@victr/deepmerge"

const result1 = deepmerge({ a: "value" }, { b: 404 })
const result2 = deepmergeAll({ a: "value" }, { b: 404 }, { a: 404 })

console.log(result1) // {a: 'value',  b: 404 }
console.log(result2) // {a: 404,  b: 404 }
```

#### mergeArray

The default mode to merge Arrays is to concat the source-Array to the target-Array.

```js
import deepmerge from "@victr/deepmerge"

const target = [1, 2, 3]
const source = [4, 5, 6]
const result = deepmerge()(target, source)
console.log(result) // [1, 2, 3, 4, 5, 6]
```

To overwrite the default behaviour regarding merging Arrays, you can provide a function to the
`mergeArray` option of the deepmerge-function. The function provided to `mergeArray`
gets an options-parameter passed, which is an Object containing the following keys and values.

```typescript
clone: (value: any) => any;
isMergeableObject: (value: any) => any;
deepmerge: DeepMergeFn;
getKeys: (value: object) => string[];
```

The `mergeAray`-Function needs to return the actual Array merging function, which accepts two parameters of type
Array, and returns a value.

Example 1: Replace the target-Array with a clone of the source-Array.

```js
import deepmerge from "@victr/deepmerge"

function replaceByClonedSource(options) {
	const clone = options.clone
	return function (target, source) {
		return clone(source)
	}
}

const result = deepmerge({ mergeArray: replaceByClonedSource })([1, 2, 3], [4, 5, 6])
console.log(result) // [4, 5, 6]
```

Example 2: Merge each element of the source-Array with the element at the same index-position of the target-Array.

```js
import deepmerge from "@victr/deepmerge"

function deepmergeArray(options) {
	const deepmerge = options.deepmerge
	const clone = options.clone
	return function (target, source) {
		let i = 0
		const tl = target.length
		const sl = source.length
		const il = Math.max(target.length, source.length)
		const result = new Array(il)
		for (i = 0; i < il; ++i) {
			if (i < sl) {
				result[i] = deepmerge(target[i], source[i])
			} else {
				result[i] = clone(target[i])
			}
		}
		return result
	}
}

// default behaviour
const deepmergeConcatArray = deepmerge()
const resultConcatArray = deepmergeConcatArray([{ a: [1, 2, 3] }], [{ b: [4, 5, 6] }])
console.log(resultConcatArray) // [ { a: [ 1, 2, 3 ]}, { b: [ 4, 5, 6 ] } ]

// modified behaviour
const deepmergeDeepmergeArray = deepmerge({ mergeArray: deepmergeArray })
const resultDeepmergedArray = deepmergeDeepmergeArray([{ a: [1, 2, 3] }], [{ b: [4, 5, 6] }])
console.log(resultDeepmergedArray) // [ { a: [ 1, 2, 3 ], b: [ 4, 5, 6 ] } ]
```

#### cloneProtoObject

Merging objects with prototypes, such as Streams or Buffers, are not supported by default.
You can provide a custom function to let this module deal with the object that has a `prototype` _(JSON object excluded)_.

```js
import deepmerge from "@victr/deepmerge"

function cloneByReference(source) {
	return source
}

const deepmergeByReference = deepmerge({
	cloneProtoObject: cloneByReference,
})

const result = deepmergeByReference({}, { stream: process.stdout })
console.log(result) // { stream: <ref *1> WriteStream }
```

## Benchmarks

The benchmarks are available in the benchmark-folder.

`npm run bench` - benchmark various use cases of deepmerge:

```
@fastify/deepmerge: merge regex with date x 1,256,523,040 ops/sec ±0.16% (92 runs sampled)
@fastify/deepmerge: merge object with a primitive x 1,256,082,915 ops/sec ±0.25% (97 runs sampled)
@fastify/deepmerge: merge two arrays containing strings x 25,392,605 ops/sec ±0.22% (97 runs sampled)
@fastify/deepmerge: two merge arrays containing objects x 1,655,426 ops/sec ±0.65% (96 runs sampled)
@fastify/deepmerge: merge two flat objects x 15,571,029 ops/sec ±0.45% (96 runs sampled)
@fastify/deepmerge: merge nested objects x 7,601,328 ops/sec ±0.31% (96 runs sampled)
```

`npm run bench:compare` - comparison of @fastify/deepmerge with other popular deepmerge implementation:

```
@fastify/deepmerge x 605,343 ops/sec ±0.87% (96 runs sampled)
deepmerge x 20,312 ops/sec ±1.06% (92 runs sampled)
merge-deep x 83,167 ops/sec ±1.30% (94 runs sampled)
ts-deepmerge x 175,977 ops/sec ±0.57% (96 runs sampled)
deepmerge-ts x 174,973 ops/sec ±0.44% (93 runs sampled)
lodash.merge x 89,213 ops/sec ±0.70% (98 runs sampled)
```

## License

Licensed under [MIT](./LICENSE).
