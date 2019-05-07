import { Base } from './base';
export declare class NamedType extends Base {
    name: string;
    type: Base;
    optional: boolean;
    default: any;
    constructor(name: string, type: any);
    setConstraint(constraint: any): NamedType;
    expand(): NamedType;
    depthMax(): number;
    toString(): string;
}
