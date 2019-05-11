import { Base } from './base';
export declare class ComponentPresence extends Base {
    identifier: string;
    absentPresent: string;
    constructor(identifier: string, absentPresent: string);
    setConstraint(constraint: any): ComponentPresence;
    expand(): ComponentPresence;
    depthMax(): never;
    toString(): string;
}