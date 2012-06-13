# require-hm

A simulation of some APIs that are proposed for ECMAScript Harmony for
JavaScript modules, but done as a loader plugin that works with
[RequireJS](http://requirejs.org), and other AMD loaders that support
the [loader plugin API](http://requirejs.org/docs/plugins.html) supported by
RequireJS. See `dist/hm.js`.

The APIs are taken from here:

* [harmony:modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules)
* [harmony:module_loaders](http://wiki.ecmascript.org/doku.php?id=harmony:module_loaders)
* [harmony:modules_examples](http://wiki.ecmascript.org/doku.php?id=harmony:modules_examples)

Not all the APIs are supported, see further below for more details.

## Goals

The goal is to allow using harmony-like modules today, that work in today's
browsers and in Node. This allows playing with the APIs to make sure
they get some use and understanding before baking them into a standard.

It is also a way for me to experiment with the API and suggest changes in a way
that holds together in real code.

## Limitations

The loader plugin just uses some regular expressions, and
it relies on existing JavaScript engines, which cannot do the fancy compilation
and linking that native support can do.

This means some things that would be early errors in a native implementation are
not early errors with this approach, and there are probably some parsing edge
cases that fail with this approach vs. native support.

It is possible to take this code and go further with a real parser, and
this code may expand for that purpose, but for now, the regexp
approach allows a quicker proof of concept.

## Supportedå

Note that literal module syntax is not used here (e.g `module moduleName {}`), instead opting for the module body for each module file. This isn't an issue however as Require HM will still allow modules to be imported and used as normal.

A simple module

```
// math.hm
export function sum(x, y) {
    return x + y;
}
export var pi = 3.141593;
```

A simple client

```
// we can import in script code, not just inside a module
import {sum, pi} from 'math';
 
alert("2π = " + sum(pi, pi));
```

Convenience form

```
// import everything
import * from 'math';
 
alert("2π = " + sum(pi, pi));
```

Reflecting module instances as first-class objects

```
// a static module reference
module M = math;
 
// reify M as an immutable "module instance object"
alert("2π = " + M.sum(M.pi, M.pi));
```

Local renaming

```
import { name: drawShape } from shape;
import { name: drawGun } from cowboy;
```

Remote modules on the web (as long as they don't break Cross-Origin policies)

```
// loading from a URL
module JSON at 'gamma';
 
alert(JSON.stringify(gamma));
```

Remote modules on the web (2)

```
// loading from a URL providing sub-modules
module YUI at 'yui3';
 
alert(YUI.dom.Color.toHex(“blue”));
```

Parameterization

```
// DOMMunger.hm
// parameterized by a DOM implementation
export function make(domAPI) {
    return {
        munge: function(doc) {
            ...
            domAPI.alert('hi!');
            ...
        }
    };
}
```

```
// SafeDOM.hm
import * from DOM;

export var document = {
    write: function(txt) {
        alert('I\'m sorry, Dave, I\'m afraid I can\'t do that...')
    },
    ...
};
```

```
// Usage:
var instance = DOMMunger.make(SafeDOM);
instance.munge(...);
```

Shared state

```
// Counter.hm
var n = 0;
export function increment() { return n++ }
export function current() { return n }
```


