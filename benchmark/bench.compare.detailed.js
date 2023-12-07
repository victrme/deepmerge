import Benchmark from "benchmark"
import deepmerge from "deepmerge"
import mergedeep from "merge-deep"
import tsdeepmerge from "ts-deepmerge"
import * as deepmergets from "deepmerge-ts"
import lodashMerge from "lodash.merge"
import thisDeepMerge from "../index.js"

const fastifyDeepmerge = thisDeepMerge({ symbol: false })
const deepmergeTs = deepmergets.deepmerge
const tsDeepmerge = tsdeepmerge.default

const sourceSimple = { key1: "changed", key2: "value2" }
const targetSimple = { key1: "value1", key3: "value3" }

const sourceNested = {
	key1: {
		subkey1: "subvalue1",
		subkey2: "subvalue2",
	},
}
const targetNested = {
	key1: "value1",
	key2: "value2",
}

const primitive = "primitive"

const date = new Date()
const regex = /a/g

const simpleArrayTarget = ["a1", "a2", "c1", "f1", "p1"]
const simpleArraySource = ["t1", "s1", "c2", "r1", "p2", "p3"]

const complexArraySource = [
	{ ...sourceSimple },
	{ ...sourceSimple },
	{ ...sourceSimple },
	{ ...sourceSimple },
	{ ...sourceSimple },
]
const complexArrayTarget = [
	{ ...targetSimple },
	{ ...targetSimple },
	{ ...targetSimple },
	{ ...targetSimple },
	{ ...targetSimple },
]

new Benchmark.Suite()
	.add("@fastify/deepmerge: merge regex with date", () => fastifyDeepmerge(regex, date))
	.add("@fastify/deepmerge: merge object with a primitive", () => fastifyDeepmerge(targetSimple, primitive))
	.add("@fastify/deepmerge: merge two arrays containing strings", () =>
		fastifyDeepmerge(simpleArrayTarget, simpleArraySource)
	)
	.add("@fastify/deepmerge: two merge arrays containing objects", () =>
		fastifyDeepmerge(complexArrayTarget, complexArraySource)
	)
	.add("@fastify/deepmerge: merge two flat objects", () => fastifyDeepmerge(targetSimple, sourceSimple))
	.add("@fastify/deepmerge: merge nested objects", () => fastifyDeepmerge(targetNested, sourceNested))
	.add("deepmerge: merge regex with date", () => deepmerge(regex, date))
	.add("deepmerge: merge object with a primitive", () => deepmerge(targetSimple, primitive))
	.add("deepmerge: merge two arrays containing strings", () => deepmerge(simpleArrayTarget, simpleArraySource))
	.add("deepmerge: two merge arrays containing objects", () => deepmerge(complexArrayTarget, complexArraySource))
	.add("deepmerge: merge two flat objects", () => deepmerge(targetSimple, sourceSimple))
	.add("deepmerge: merge nested objects", () => deepmerge(targetNested, sourceNested))
	.add("merge-deep: merge regex with date", () => mergedeep(regex, date))
	.add("merge-deep: merge object with a primitive", () => mergedeep(targetSimple, primitive))
	.add("merge-deep: merge two arrays containing strings", () => mergedeep(simpleArrayTarget, simpleArraySource))
	.add("merge-deep: two merge arrays containing objects", () => mergedeep(complexArrayTarget, complexArraySource))
	.add("merge-deep: merge two flat objects", () => mergedeep(targetSimple, sourceSimple))
	.add("merge-deep: merge nested objects", () => mergedeep(targetNested, sourceNested))
	.add("ts-deepmerge: merge regex with date", () => tsDeepmerge(regex, date))
	.add("ts-deepmerge: merge object with a primitive", () => tsDeepmerge(targetSimple, primitive))
	.add("ts-deepmerge: merge two arrays containing strings", () => tsDeepmerge(simpleArrayTarget, simpleArraySource))
	.add("ts-deepmerge: two merge arrays containing objects", () => tsDeepmerge(complexArrayTarget, complexArraySource))
	.add("ts-deepmerge: merge two flat objects", () => tsDeepmerge(targetSimple, sourceSimple))
	.add("ts-deepmerge: merge nested objects", () => tsDeepmerge(targetNested, sourceNested))
	.add("deepmerge-ts: merge regex with date", () => deepmergeTs(regex, date))
	.add("deepmerge-ts: merge object with a primitive", () => deepmergeTs(targetSimple, primitive))
	.add("deepmerge-ts: merge two arrays containing strings", () => deepmergeTs(simpleArrayTarget, simpleArraySource))
	.add("deepmerge-ts: two merge arrays containing objects", () => deepmergeTs(complexArrayTarget, complexArraySource))
	.add("deepmerge-ts: merge two flat objects", () => deepmergeTs(targetSimple, sourceSimple))
	.add("deepmerge-ts: merge nested objects", () => deepmergeTs(targetNested, sourceNested))
	.add("lodash.merge: merge regex with date", () => lodashMerge(regex, date))
	.add("lodash.merge: merge object with a primitive", () => lodashMerge(targetSimple, primitive))
	.add("lodash.merge: merge two arrays containing strings", () => lodashMerge(simpleArrayTarget, simpleArraySource))
	.add("lodash.merge: two merge arrays containing objects", () => lodashMerge(complexArrayTarget, complexArraySource))
	.add("lodash.merge: merge two flat objects", () => lodashMerge(targetSimple, sourceSimple))
	.add("lodash.merge: merge nested objects", () => lodashMerge(targetNested, sourceNested))
	.on("cycle", (event) => console.log(String(event.target)))
	.run()
