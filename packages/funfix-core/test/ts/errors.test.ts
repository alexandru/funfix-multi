/*
 * Copyright (c) 2017 by The Funfix Project Developers.
 * Some rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as assert from "assert"
import { assertEqual, assertNotEqual } from "./common"

import {
  DummyError,
  CompositeError,
  IllegalInheritanceError,
  IllegalStateError,
  NoSuchElementError,
  IllegalArgumentError,
  NotImplementedError,
  TimeoutError
} from "../../src/"

describe("DummyError", () => {
  it("has custom message", () => {
    const ex = new DummyError("dummy")

    assertEqual(ex.name, "DummyError")
    assertEqual(ex.message, "dummy")
  })
})

describe("CompositeError", () => {
  it("has custom message for 3 errors", () => {
    const ex = () => new DummyError("dummy")
    const composite = new CompositeError(["simple", ex(), ex(), ex()])

    assertEqual(composite.name, "CompositeError")
    assertEqual(composite.message, "simple, DummyError(dummy), ...")

    assertEqual(composite.errors().length, 4)
    for (const e of composite.errors()) {
      assert.ok(e instanceof DummyError || typeof e === "string")
    }
  })

  it("has custom message for 2 errors", () => {
    const ex = () => new DummyError("dummy")
    const composite = new CompositeError([ex(), ex()])

    assertEqual(composite.name, "CompositeError")
    assertEqual(composite.message, "DummyError(dummy), DummyError(dummy)")

    assertEqual(composite.errors().length, 2)
    for (const e of composite.errors()) {
      assert.ok(e instanceof DummyError)
    }
  })

  it("has custom message for empty array", () => {
    const composite = new CompositeError([])

    assertEqual(composite.name, "CompositeError")
    assertEqual(composite.message, "")
    assertEqual(composite.errors().length, 0)
  })
})

describe("IllegalStateError", () => {
  it("has custom message", () => {
    const ex = new IllegalStateError("dummy")

    assertEqual(ex.name, "IllegalStateError")
    assertEqual(ex.message, "dummy")
  })
})

describe("IllegalInheritanceError", () => {
  it("has custom message", () => {
    const ex = new IllegalInheritanceError("dummy")

    assertEqual(ex.name, "IllegalInheritanceError")
    assertEqual(ex.message, "dummy")
  })
})

describe("NoSuchElementError", () => {
  it("has custom message", () => {
    const ex = new NoSuchElementError("dummy")

    assertEqual(ex.name, "NoSuchElementError")
    assertEqual(ex.message, "dummy")
  })
})

describe("IllegalArgumentError", () => {
  it("has custom message", () => {
    const ex = new IllegalArgumentError("dummy")

    assertEqual(ex.name, "IllegalArgumentError")
    assertEqual(ex.message, "dummy")
  })
})

describe("NotImplementedError", () => {
  it("has custom message", () => {
    const ex = new NotImplementedError("dummy")

    assertEqual(ex.name, "NotImplementedError")
    assertEqual(ex.message, "dummy")
  })
})

describe("TimeoutError", () => {
  it("has custom message", () => {
    const ex = new TimeoutError("dummy")

    assertEqual(ex.name, "TimeoutError")
    assertEqual(ex.message, "dummy")
  })
})
