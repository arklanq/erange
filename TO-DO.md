### TO-DO

- [ ] @Inject decorator ^1 ^2
- [ ] @Singleton decorator ^1
- [ ] BINDING_ALREADY_SET option, throwing error if binding is already defined for specified token
- [ ] Alias providers
- [ ] Async factory providers
- [ ] Throw error if factory provider returned `undefined | null` value
- [ ] and more from `microsoft/tsyringe`
- [ ] and more from `google/guice`

##### Annotations

- **^1** ESNext decorators cannot be used to infer constructor arguments defined in design phase.
TypeScript 5.2 does not emit metadata unlike the legacy "emitDecoratorMetadata" option.

- **^2** Current implementation of the `@inject` decorator suffers from "circular dependency" issues. Subject
