import Benchmark from "benchmark"
import { deepmerge } from "../index.js"

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
	.add("merge regex with date", () => deepmerge(regex, date))
	.add("merge object with a primitive", () => deepmerge(targetSimple, primitive))
	.add("merge two arrays containing strings", () => deepmerge(simpleArrayTarget, simpleArraySource))
	.add("two merge arrays containing objects", () => deepmerge(complexArrayTarget, complexArraySource))
	.add("merge two flat objects", () => deepmerge(targetSimple, sourceSimple))
	.add("merge nested objects", () => deepmerge(targetNested, sourceNested))
	.on("cycle", (event) => console.log(String(event.target)))
	.run()
