import { Base } from './base';
import { ComponentPresence } from './componentPresence';
import { ExtensionMarker } from './extensionMarker';
export declare class WithComponents extends Base {
    components: Array<ExtensionMarker | ComponentPresence>;
    constructor(components: Array<ExtensionMarker | ComponentPresence>);
    setConstraint(constraint: any): WithComponents;
    expand(): WithComponents;
    toString(): string;
}
