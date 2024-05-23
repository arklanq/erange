import type {InstantiationCapable} from '../class-injector/InstantiationCapable.js';
import type {ResolutionCapable} from '../resolution/ResolutionCapable.js';

export interface AbstractModuleContainer extends ResolutionCapable, InstantiationCapable {}
