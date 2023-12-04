import type {Container} from '../Container.js';

export interface ResolutionContext {
  readonly container: Container;
}

export function createResolutionContext(container: Container): ResolutionContext {
  return {container: container};
}
