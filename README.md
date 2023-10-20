## Erange

[![npm](https://img.shields.io/npm/v/erange?style=for-the-badge&color=blue)](https://www.npmjs.com/package/erange)
[![Static Badge](https://img.shields.io/badge/license-mit-brightgreen?style=for-the-badge)](./LICENSE)

**Erange** (pronounced 'arrange') - flexible, lightweight and easy to use dependency injection for `JS`/`TS`.

### Table of contents

* [What is a `Dependency Injection`?](#what-is-a-dependency-injection)
* [Why `erange`?](#why-erange)
* [Quick showcase](#quick-showcase)
* [Installation](#installation)
* [Documentation & user guide](#documentation--user-guide)

### What is a `Dependency Injection`?

[Dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) is
an [inversion of control (IoC)](https://en.wikipedia.org/wiki/Inversion_of_control) technique wherein you delegate
instantiation of dependencies to the IoC container, instead of doing it in your own code imperatively.

There are many advantages to using dependency injection, but doing so manually often leads to a large amount of
boilerplate code to be written. **Erange** is a framework that makes it possible to write code that uses dependency
injection without the hassle of writing much of that boilerplate code.

See also:

* [Dependency injection in JavaScript / snyk.io](https://snyk.io/blog/dependency-injection-in-javascript/)
* [Dependency Injection - Design Patterns in JavaScript / TomDoesTech](https://www.youtube.com/watch?v=W-Szy00-g_8&ab_channel=TomDoesTech)

### Why `erange`?

* 🍭 Easy to use.
* ☕️ Very intuitive.
* 💻 Modern solution.
* 📘 Excellent TypeScript support.
* 📒 Also works with plain JavaScript.
* 🪐 Brings best DX from popular alternatives.
* 📦 Distributions in ESM and CommonJS standards.
* ❌ Does not use outdated and experimental (stage 2) TypeScript decorators.

### Quick showcase

For those who don't like to read a lot.

```typescript
import {container, Scope} from 'erange';
// ... other imports

// EXAMPLE 1 - Transient, class binding
// Bind `PayPalPaymentProcessor` concrete class to `PaymentProcessor` higher-order class
container.bind(PaymentProcessor).toClass(PayPalPaymentProcessor).inScope(Scope.TRANSIENT);

// Retrieve two instances of `PaymentProcessor` interface implementation from container
const pp1 = container.resolve(PaymentProcessor);
const pp2 = container.resolve(PaymentProcessor);

// Each time we call container to resolve transient binding we will get the new instance
pp1 === pp2 // false

// EXAMPLE 2 - Singleton, instance binding
// Bind `3000` value to `SERVER_PORT` token
container.bind('SERVER_PORT').toInstance(3000).inScope(Scope.SINGLETON);

app.listen(container.resolve<number>('SERVER_PORT'));
```

I know there are more questions than answers in your head right now, but that's okay.
Install `erange`, jump straight to the documentation, and see that it is not black magic!

Note that the above code fragment is just a scratch of the erange's complete system. In addition to what you have
already seen there is also:

* Transient and Singleton bindings.
* Class, instance, factory and alias providers.
* Easily accessible, global, shared container.
* Custom container instances.
* Experimental ECMA Script Stage 3 decorators support (work in progress).
* ... and a lot more coming soon!

### Installation

```bash
# With NPM
npm install erange

# With Yarn
yarn add erange
```

**Optionally** if you opt-in to use experimental container's option `unstable_useNewDecoratorsSyntax` you should
additionaly polyfill `decorators metadata` feature as it may not be implemented yet in the environment or bundler
of your choice. To do so simply install `core-js` and put the following import at the very beginning of your code 
(entrypoint to your application).

```javascript
// With or without `.js` extension, depending on your environment context (ESM/CJS)
import 'core-js/proposals/decorator-metadata-v2.js';
```

### Documentation & user guide

For an introduction to **Erange** and complete documentation, check out
[Wiki](https://github.com/arklanq/erange/wiki).
