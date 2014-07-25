# Agni

## Purpose

Maybe you have the same problem, over and over to create a solid base for your applications,
with simple principles and agile to define and setup your flow and start to develop. Here we are,
at the same way, maybe you know how to deal with well, but organize all that things has a high consumption of time and energy.
Let's start talk about to create something amazing and simple to deal with.

## Starting a clean agni project

  ```
  [sudo] agni --up or [sudo] agni --start
  ```

## Structure

Each part was a functional component of the application, but each one of them has a organic and co-operative task.

### Modules

Is small parts of you software who have a unit code, small pieces.

Let me show you and example:

```javascript
// file: modules/sum.js
function sumHandler(a, b) {
  return a + b;
}
module.exports = exports = sumHandler;
```

Now you need to register that piece in the `modules/index.js`, see above:

```javascript
// file: modules/index.js
exports.sum = require('sum');
```

Now you be able to call the same function in mutiple ways, and the first is:

```javascript
// file: somefile.js - this file is at the same level of modules/
var modules = require('./modules');
modules.sum(1, 2);
```

And the second way is call the 'modules/sum' directly:

```javascript
// file: somefile.js - this file is at the same level modules/
var sum = require('./modules/sum');
sum(1, 2);
```

But the second way is dangereous to us, because if you have a big enviroment to deal with,
you have more chances to create conflicts and generate rework.

The third way is adding one identifier to save you from conflicts, using a pattern no call the modules,
just like that:

```
// file: somefile.js - this file is at the same level of modules/
var moduleSum = require('./modules/sum');
moduleSum(1, 2);
```

Now i give to you the `agni` way to deal with that, restarting the process:

  ```
  [sudo] agni --module sum
  ```

That command create and file in the current structure using the modules/ dir as base of modules,
and you can put the flag '-e' who after the file generation the `agni` dispatch a call to you default
editor using `EDITOR` env var you just putting the name after the command, see above:

  ```
  [sudo] agni --module sum -e
  ```

or

  ```
  [sudo] agni --module sum -e vim
  ```
