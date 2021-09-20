import { ScopedRegistryHost } from '@lit-labs/scoped-registry-mixin';
import { dedupeMixin } from '@open-wc/dedupe-mixin';

const ScopedRegistryMixin = dedupeMixin(ScopedRegistryHost);

export default ScopedRegistryMixin;
