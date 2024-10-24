type DeepMergeFn = <T1, T2>(target: T1, source: T2) => DeepMerge<T1, T2>
type DeepMergeAllFn = <T extends Array<any>>(...targets: T) => DeepMergeAll<{}, T>

type Primitive = null | undefined | string | number | boolean | symbol | bigint

type BuiltIns = Primitive | Date | RegExp

type MergeArrays<T, U> = T extends readonly any[] ? (U extends readonly any[] ? [...T, ...U] : never) : never

type DifferenceKeys<T, U, T0 = Omit<T, keyof U> & Omit<U, keyof T>, T1 = { [K in keyof T0]: T0[K] }> = T1

type IntersectionKeys<T, U> = Omit<T | U, keyof DifferenceKeys<T, U>>

type DeepMergeHelper<
	T,
	U,
	T0 = DifferenceKeys<T, U> & { [K in keyof IntersectionKeys<T, U>]: DeepMerge<T[K], U[K]> },
	T1 = { [K in keyof T0]: T0[K] }
> = T1

type DeepMerge<T, U> = U extends BuiltIns
	? U
	: [T, U] extends [readonly any[], readonly any[]]
	? MergeArrays<T, U>
	: [T, U] extends [{ [key: string]: unknown }, { [key: string]: unknown }]
	? DeepMergeHelper<T, U>
	: U

type First<T> = T extends [infer _I, ...infer _Rest] ? _I : never
type Rest<T> = T extends [infer _I, ...infer _Rest] ? _Rest : never

type DeepMergeAll<R, T> = First<T> extends never ? R : DeepMergeAll<DeepMerge<R, First<T>>, Rest<T>>

type MergeArrayFnOptions = {
	clone: (value: any) => any
	isMergeableObject: (value: any) => boolean
	deepmerge: DeepMergeFn
	getKeys: (value: object) => string[]
}

type MergeArrayFn = (options: MergeArrayFnOptions) => (target: any[], source: any[]) => any[]

interface Options {
	mergeArray?: MergeArrayFn
	symbols?: boolean
	all?: boolean
}

type DeepmergeConstructor = typeof fastifyDeepMerge

declare namespace fastifyDeepMerge {
	export { Options }
	export const fastifyDeepMerge: DeepmergeConstructor
	export { fastifyDeepMerge as default }
}

declare function fastifyDeepMerge(options: Options & { all: true }): DeepMergeAllFn
declare function fastifyDeepMerge(options?: Options): DeepMergeFn

export declare function deepmergeAll<T extends Array<any>>(...targets: T): DeepMergeAll<{}, T>

export declare function deepmerge<T, S>(target: T, source: S): DeepMerge<T, S>

export default fastifyDeepMerge
