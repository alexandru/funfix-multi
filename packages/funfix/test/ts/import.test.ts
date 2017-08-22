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

import { Option, Future, is, Some, Success, Eval, Monad, monadErrorOf } from "../../src"

describe("sanity test", () => {
  test("works for Option", () => {
    expect(is(Option.of(3), Some(3))).toBeTruthy()
  })

  test("works for Future", () => {
    expect(is(Future.pure(3).value(), Some(Success(3)))).toBeTruthy()
  })

  test("works for Eval", () => {
    expect(Eval.of(() => 10).get()).toBe(10)
  })

  test("works for Monad", () => {
    const m = monadErrorOf(Eval)
    const v = m.flatMap(Eval.of(() => 1), a => Eval.of(() => a + 1)) as Eval<number>
    console.info(Eval._funTypes)
    expect(v.get()).toBe(2)
  })
})
