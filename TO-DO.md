# TO-DO

#### Done
- [X] Wiki (now deprecated)
- [X] Alias providers
- [X] Async factory providers
- [X] Allow `null` values to be stored or produced by factories
- [X] Custom scopes
- [x] Sub-containers (modular containers)
- [x] Tree drawer

#### Important

- [ ] FactoryProvider can also be a class which implements `Factory` interface
- [ ] Static analysis of modules tree
- [ ] Module bootstrapping phase -> Module configuration phase
- [ ] Lifecycle events (Bootstrap -> Enable - ... -> Disable -> Shutdown?)

#### Features

- [ ] Decorators (@Inject, @Singleton, @Transient, @Annotation)
- [ ] Throw error if binding is already defined for specified token (configurable), also check throughout imported modules
- [ ] Throw error if factory provider returned `undefined | null` value (configurable)

#### Long term backlog

- [ ] Good tests
- [ ] Real documentation instead of deprecated Wiki
- [ ] Provide links to valid wiki pages instead of example.com

#### Worth looking further

- [ ] and more from `microsoft/tsyringe`
- [ ] and more from `google/guice`
