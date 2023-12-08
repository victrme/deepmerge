import Benchmark from "benchmark"
import deepmerge from "deepmerge"
import mergedeep from "merge-deep"
import lodashMerge from "lodash.merge"
import tsdeepmerge from "ts-deepmerge"
import * as deepmergets from "deepmerge-ts"
import * as fastify from "../index.js"

const deepmergeTs = deepmergets.deepmerge
const tsDeepmerge = tsdeepmerge.default

const primitive = "primitive"

const date = new Date()
const regex = /a/g

const simpleS = { key1: "changed", key2: "value2" }
const simpleT = { key1: "value1", key3: "value3" }

const nestedS = { key1: { subkey1: "subvalue1", subkey2: "subvalue2" } }
const nestedT = { key1: "value1", key2: "value2" }

const simpleArrT = ["a1", "a2", "c1", "f1", "p1"]
const simpleArrS = ["t1", "s1", "c2", "r1", "p2", "p3"]

const complexArrS = [{ ...simpleS }, { ...simpleS }, { ...simpleS }, { ...simpleS }, { ...simpleS }]
const complexArrT = [{ ...simpleT }, { ...simpleT }, { ...simpleT }, { ...simpleT }, { ...simpleT }]

new Benchmark.Suite()
	.add("@fastify/deepmerge: merge regex with date", () => fastify.deepmerge(regex, date))
	.add("@fastify/deepmerge: merge object with a primitive", () => fastify.deepmerge(simpleT, primitive))
	.add("@fastify/deepmerge: merge two arrays containing strings", () => fastify.deepmerge(simpleArrT, simpleArrS))
	.add("@fastify/deepmerge: two merge arrays containing objects", () => fastify.deepmerge(complexArrT, complexArrS))
	.add("@fastify/deepmerge: merge two flat objects", () => fastify.deepmerge(simpleT, simpleS))
	.add("@fastify/deepmerge: merge nested objects", () => fastify.deepmerge(nestedT, nestedS))
	.add("deepmerge: merge regex with date", () => deepmerge(regex, date))
	.add("deepmerge: merge object with a primitive", () => deepmerge(simpleT, primitive))
	.add("deepmerge: merge two arrays containing strings", () => deepmerge(simpleArrT, simpleArrS))
	.add("deepmerge: two merge arrays containing objects", () => deepmerge(complexArrT, complexArrS))
	.add("deepmerge: merge two flat objects", () => deepmerge(simpleT, simpleS))
	.add("deepmerge: merge nested objects", () => deepmerge(nestedT, nestedS))
	.add("merge-deep: merge regex with date", () => mergedeep(regex, date))
	.add("merge-deep: merge object with a primitive", () => mergedeep(simpleT, primitive))
	.add("merge-deep: merge two arrays containing strings", () => mergedeep(simpleArrT, simpleArrS))
	.add("merge-deep: two merge arrays containing objects", () => mergedeep(complexArrT, complexArrS))
	.add("merge-deep: merge two flat objects", () => mergedeep(simpleT, simpleS))
	.add("merge-deep: merge nested objects", () => mergedeep(nestedT, nestedS))
	.add("ts-deepmerge: merge regex with date", () => tsDeepmerge(regex, date))
	.add("ts-deepmerge: merge object with a primitive", () => tsDeepmerge(simpleT, primitive))
	.add("ts-deepmerge: merge two arrays containing strings", () => tsDeepmerge(simpleArrT, simpleArrS))
	.add("ts-deepmerge: two merge arrays containing objects", () => tsDeepmerge(complexArrT, complexArrS))
	.add("ts-deepmerge: merge two flat objects", () => tsDeepmerge(simpleT, simpleS))
	.add("ts-deepmerge: merge nested objects", () => tsDeepmerge(nestedT, nestedS))
	.add("deepmerge-ts: merge regex with date", () => deepmergeTs(regex, date))
	.add("deepmerge-ts: merge object with a primitive", () => deepmergeTs(simpleT, primitive))
	.add("deepmerge-ts: merge two arrays containing strings", () => deepmergeTs(simpleArrT, simpleArrS))
	.add("deepmerge-ts: two merge arrays containing objects", () => deepmergeTs(complexArrT, complexArrS))
	.add("deepmerge-ts: merge two flat objects", () => deepmergeTs(simpleT, simpleS))
	.add("deepmerge-ts: merge nested objects", () => deepmergeTs(nestedT, nestedS))
	.add("lodash.merge: merge regex with date", () => lodashMerge(regex, date))
	.add("lodash.merge: merge object with a primitive", () => lodashMerge(simpleT, primitive))
	.add("lodash.merge: merge two arrays containing strings", () => lodashMerge(simpleArrT, simpleArrS))
	.add("lodash.merge: two merge arrays containing objects", () => lodashMerge(complexArrT, complexArrS))
	.add("lodash.merge: merge two flat objects", () => lodashMerge(simpleT, simpleS))
	.add("lodash.merge: merge nested objects", () => lodashMerge(nestedT, nestedS))
	.on("cycle", (event) => console.log(String(event.target)))
	.run()
