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
	.add("@fastify/deepmerge", function () {
		fastifyDeepmerge(regex, date)
		fastifyDeepmerge(targetSimple, primitive)
		fastifyDeepmerge(simpleArrayTarget, simpleArraySource)
		fastifyDeepmerge(complexArrayTarget, complexArraySource)
		fastifyDeepmerge(complexArrayTarget, complexArraySource)
		fastifyDeepmerge(targetSimple, sourceSimple)
		fastifyDeepmerge(targetNested, sourceNested)
	})
	.add("deepmerge", function () {
		deepmerge(regex, date)
		deepmerge(targetSimple, primitive)
		deepmerge(simpleArrayTarget, simpleArraySource)
		deepmerge(complexArrayTarget, complexArraySource)
		deepmerge(complexArrayTarget, complexArraySource)
		deepmerge(targetSimple, sourceSimple)
		deepmerge(targetNested, sourceNested)
	})
	.add("merge-deep", function () {
		mergedeep(regex, date)
		mergedeep(targetSimple, primitive)
		mergedeep(simpleArrayTarget, simpleArraySource)
		mergedeep(complexArrayTarget, complexArraySource)
		mergedeep(complexArrayTarget, complexArraySource)
		mergedeep(targetSimple, sourceSimple)
		mergedeep(targetNested, sourceNested)
	})
	.add("ts-deepmerge", function () {
		tsDeepmerge(regex, date)
		tsDeepmerge(targetSimple, primitive)
		tsDeepmerge(simpleArrayTarget, simpleArraySource)
		tsDeepmerge(complexArrayTarget, complexArraySource)
		tsDeepmerge(complexArrayTarget, complexArraySource)
		tsDeepmerge(targetSimple, sourceSimple)
		tsDeepmerge(targetNested, sourceNested)
	})
	.add("deepmerge-ts", function () {
		deepmergeTs(regex, date)
		deepmergeTs(targetSimple, primitive)
		deepmergeTs(simpleArrayTarget, simpleArraySource)
		deepmergeTs(complexArrayTarget, complexArraySource)
		deepmergeTs(complexArrayTarget, complexArraySource)
		deepmergeTs(targetSimple, sourceSimple)
		deepmergeTs(targetNested, sourceNested)
	})
	.add("lodash.merge", function () {
		lodashMerge(regex, date)
		lodashMerge(targetSimple, primitive)
		lodashMerge(simpleArrayTarget, simpleArraySource)
		lodashMerge(complexArrayTarget, complexArraySource)
		lodashMerge(complexArrayTarget, complexArraySource)
		lodashMerge(targetSimple, sourceSimple)
		lodashMerge(targetNested, sourceNested)
	})
	.on("cycle", function (event) {
		console.log(String(event.target))
	})
	.run()
