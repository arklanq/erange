### TO-DO

- [ ] Readme / Wiki
- [ ] @Inject decorator ^1 ^2
- [ ] @Singleton decorator
- [ ] @Annotation decorator, annotated(...) decorator helper, {binding}.annotated chaining method
- [ ] BINDING_ALREADY_SET option, throwing error if binding is already defined for specified token
- [X] Alias providers
- [X] Async factory providers
- [ ] Custom scopes
- [ ] Throw error if factory provider returned `undefined | null` value
- [ ] Sub-containers
- [ ] and more from `microsoft/tsyringe`
- [ ] and more from `google/guice`

##### Footnotes

- **^1** ESNext decorators cannot be used to infer constructor arguments defined in design phase.
  TypeScript 5.2 does not emit metadata unlike the legacy "emitDecoratorMetadata" option.

- **^2** Current implementation of the `@inject` decorator suffers from "circular dependency" issues.
