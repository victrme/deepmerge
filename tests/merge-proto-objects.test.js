import { fileURLToPath } from 'url'
import { Readable } from 'stream'
import fs from 'fs'

import deepmerge from '../index.js'
import { test } from 'tape'

test('merge nested objects should be immutable', function (t) {
  t.plan(3)
  const src = {
    key1: { subkey1: 'aaaaaa' }
  }
  const target = {
    key1: { subkey1: 'value1', subkey2: 'value2' }
  }

  const expected = {
    key1: { subkey1: 'aaaaaa', subkey2: 'value2' }
  }

  const result = deepmerge({
    cloneProtoObject (x) {
      t.fail('should not be called')
      return x
    }
  })(target, src)

  t.same(result, expected)

  t.same(target, {
    key1: { subkey1: 'value1', subkey2: 'value2' }
  })

  src.key1.subkey99 = 'changed again'
  t.same(result, expected, 'merge should be immutable')
})

test('should clone the stream properties', async (t) => {
  const filename = fileURLToPath(import.meta.url)
  const stream = fs.createReadStream(filename)
  t.teardown(() => stream.destroy())

  const result = deepmerge()({ logger: { foo: 'bar' } }, { logger: { stream } })
  t.equal(typeof result.logger.stream, 'object')
  t.notOk(result.logger.stream instanceof Readable)
  t.notOk(result.logger.stream.__proto___)
})

test('should clone the stream by reference', async (t) => {
  const filename = fileURLToPath(import.meta.url)
  const stream = fs.createReadStream(filename)
  t.teardown(() => stream.destroy())

  const result = deepmerge({
    cloneProtoObject (x) {
      t.ok(x instanceof Readable)
      return x
    }
  })({ logger: { foo: 'bar' } }, { logger: { stream } })
  t.equal(typeof result.logger.stream, 'object')
  t.ok(result.logger.stream instanceof Readable)
})

test('should clone the buffer by reference', async (t) => {
  const result = deepmerge({
    cloneProtoObject (x) {
      t.ok(x instanceof Buffer)
      return x
    }
  })({ logger: { foo: 'bar' } }, { logger: { buffer: Buffer.of(1, 2, 3) } })
  t.equal(typeof result.logger.buffer, 'object')
  t.ok(result.logger.buffer instanceof Buffer)
})

test('should not merge the buffers when cloned by reference', async (t) => {
  const result = deepmerge({
    cloneProtoObject (x) {
      t.ok(x instanceof Buffer)
      return x
    }
  })({ logger: { buffer: Buffer.of(1, 2, 3) } }, { logger: { buffer: Buffer.of(1, 2, 3) } })
  t.equal(typeof result.logger.buffer, 'object')
  t.ok(result.logger.buffer instanceof Buffer)
  t.same(result.logger.buffer, Buffer.of(1, 2, 3))
})

test('doc example', async (t) => {
  const stream = process.stdout

  function cloneByReference (source) {
    return source
  }

  const result = deepmerge({
    cloneProtoObject: cloneByReference
  })({}, { stream })

  t.ok(result)
  t.pass('should not throw')
})
