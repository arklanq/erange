import type { Container } from '../container/Container.js';
import { AnyProviderResolver } from '../provider/AnyProviderResolver.js';
import { RegistryGateway } from '../registry/RegistryGateway.js';
import { AnyScopeResolver } from '../scope/AnyScopeResolver.js';

export interface ResolutionContext {
  registryGateway: RegistryGateway;
}

export function createResolutionContext(container: Container): ResolutionContext {
  const anyProviderResolver = new AnyProviderResolver(container);
  const anyScopeResolver = new AnyScopeResolver(anyProviderResolver);
  const registryGateway = new RegistryGateway(anyScopeResolver);

  return { registryGateway };
}
