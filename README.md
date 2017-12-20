# get-bound-func [![NPM Package](https://img.shields.io/npm/v/get-bound-func.svg?style=flat-square)][npm]


[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)][license]


A tiny library that simplifies function binding and reduces unnecessary function binds.

Compatible with AMD, CommonJS, ES6 imports, and global HTML tag inclusion.


[Changelog](https://github.com/bsara/get-bound-func/blob/master/CHANGELOG.md)



<br/>



# Install

```bash
$ npm install --save get-bound-func
```



<br/>



# Usage

#### [CodePen Example][codepen]

<br/>

#### ES6 Modules

```js
import getBoundFunc, { deleteBoundFuncs } from 'get-bound-func';


class MyClass {

  constructor(msg) {
    this.val = msg;
  }

  onClick(e) {
    console.log(this.val);
  }

  registerOnClick(element) {
    element.addEventListener('click', getBoundFunc(this, this.onClick));
  }
}


const obj0 = new MyClass("Fish fingers and custard");
const obj1 = new MyClass(42);

const myElement = document.getElementById('myElement');

obj0.registerOnClick(myElement);
obj1.registerOnClick(myElement);


myElement.click(); // Will output `Fish fingers and custard` and `42` to console


// NOTE: It is NOT always required to call `deleteBoundFuncs`.
// See API docs of `deleteBoundFuncs` for details.
deleteBoundFuncs(obj0); // Clears all `obj0` bound functions from memory
deleteBoundFuncs(obj1); // Clears all `obj1` bound functions from memory
```

<br/>

#### CommonJS

```js
const getBoundFunc = rquire('get-bound-func');


function MyClass(msg) {
  this.val = msg;
}

MyClass.prototype.onClick = function(e) {
  console.log(this.val);
}

MyClass.prototype.registerOnClick = function(element) {
  element.addEventListener('click', getBoundFunc(this, this.onClick));
}


var obj0 = new MyClass("Fish fingers and custard");
var obj1 = new MyClass(42);

var myElement = document.getElementById('myElement');

obj0.registerOnClick(myElement);
obj1.registerOnClick(myElement);


myElement.click(); // Will output `Fish fingers and custard` and `42` to console


// NOTE: It is NOT always required to call `deleteBoundFuncs`.
// See API docs of `deleteBoundFuncs` for details.
getBoundFunc.deleteBoundFuncs(obj0); // Clears all `obj0` bound functions from memory
getBoundFunc.deleteBoundFuncs(obj1); // Clears all `obj1` bound functions from memory
```



<br/>



# API

### getBoundFunc(*context*, *func*)

Creates a new bound function of `func` that is bound to `context` and caches the result.
If `getBoundFunc` has already been called for the given `context` and `func`, then the
cached bound function is returned.

#### Parameters

- **context** (`*`)
  The context of the returned bound function (I.E. `context` will equal `this` within
  the scope of the bound function).
- **func** (`Function`)
  The function to be bound.

#### Returns

A version of `func` that is bound to `context`.

**Type:** `Function`

<br/>

### deleteBoundFunc(*context*)

Clears from memory all cached bound functions for the given `context`.

> ***NOTE:*** It is not always required to use this function to clear cached bound
> functions. Behind the scenes, [`WeakMaps`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
> are used to store the cached bound functions, therefore, whenever all other
> references to the `context` object have been removed, the `context`'s corresponding
> bound functions in the cache will automatically be cleared for you. However, this
> function has been made available in the case that you want to manually clear the cache
> so that memory is freed up sooner, or in instances where the `context` will not be
> garbage collected.
>
> *For more information, refer to the [MDN documentation on `WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#Why_WeakMap).*

#### Parameters

- **context** (`*`)
  The context of the bound functions that will be removed from memory.



<br/>



# License

ISC License (ISC)

Copyright (c) 2017, Brandon D. Sara (http://bsara.pro/)

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.




[bsara-home]: http://bsara.pro/
[license]:    https://github.com/bsara/get-bound-func/blob/master/LICENSE "License"
[npm]:        https://www.npmjs.com/package/get-bound-func                "NPM Package: get-bound-func"
[codepen]:    https://codepen.io/bsara/pen/oeLZzo?editors=1011            "getBoundFunc Example"
