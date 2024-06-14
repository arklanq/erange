import {ModularContainer} from '../modular-container/ModularContainer.js';
import {TreeDrawer} from '../utilities/TreeDrawer.js';
import type {AbstractModule} from './AbstractModule.js';
import {AbstractModuleBinding} from './AbstractModuleBinding.js';
import type {AbstractModuleContext} from './AbstractModuleContext.js';
import {AbstractModuleImporting} from './AbstractModuleImporting.js';

const metadataSymbol: unique symbol = Symbol('metadata');

interface WithMeta {
  [metadataSymbol]: AbstractModuleMeta;
}

export class AbstractModuleMeta {
  public readonly container: ModularContainer = new ModularContainer();

  public isRoot: boolean;
  public context: AbstractModuleContext;
  public treeDrawer: TreeDrawer;

  public readonly binding: AbstractModuleBinding;
  public readonly importing: AbstractModuleImporting;

  public constructor(isRoot: boolean, context: AbstractModuleContext, treeDrawer: TreeDrawer) {
    this.isRoot = isRoot;
    this.context = context;
    this.treeDrawer = treeDrawer;

    this.binding = new AbstractModuleBinding(this);
    this.importing = new AbstractModuleImporting(this);
  }

  public static attach(module: AbstractModule, meta: AbstractModuleMeta) {
    Object.defineProperty(module, metadataSymbol, {
      value: meta,
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  public static access(module: AbstractModule): AbstractModuleMeta {
    return (module as AbstractModule & WithMeta)[metadataSymbol];
  }
}
