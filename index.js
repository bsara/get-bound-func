/**
 * @license
 *
 * ISC License (ISC)
 *
 * Copyright (c) 2017, Brandon D. Sara (https://bsara.pro/)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
(function(root, factory) { // eslint-disable-line no-shadow
  if (typeof define === 'function' && define.amd) {
    define([], factory);
    return;
  }
  if (typeof exports === 'object') {
    module.exports = factory();
    return;
  }
  root.getBoundFunc     = factory();
  root.deleteBoundFuncs = root.getBoundFunc.deleteBoundFuncs;
})(this, function() {

  var _boundFuncs = new WeakMap();


  /**
   * Creates a new bound function of `func` that is bound to `context` and caches the
   * result. If `getBoundFunc` has already been called for the given `context` and `func`,
   * then the cached bound function is returned.
   *
   * @param {*}        context - The context of the returned bound function.
   * @param {Function} func    - The function to be bound.
   *
   * @returns {Function} a version of `func` that is bound to `context`.
   */
  function getBoundFunc(context, func) {
    var contextBoundFuncs = _boundFuncs.get(context);

    if (contextBoundFuncs == null) {
      contextBoundFuncs = new WeakMap();
      _boundFuncs.set(context, new WeakMap());
    }

    var boundFunc = contextBoundFuncs.get(func);

    if (boundFunc == null) {
      boundFunc = func.bind(context);
      contextBoundFuncs.set(func, boundFunc);
    }

    return boundFunc;
  }


  /**
   * Clears from memory all cached bound functions for the given `context`.
   *
   * @param {*} context - The context of the bound functions that will be removed from
   *                      memory.
   */
  function deleteBoundFuncs(context) {
    _boundFuncs.delete(context);
  }



  getBoundFunc.deleteBoundFuncs = deleteBoundFuncs;

  return getBoundFunc;
});

