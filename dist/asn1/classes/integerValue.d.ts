import { ValueReference } from './ValueReference';
export declare class IntegerValue {
    literal: string;
    value: number | ValueReference;
    private integerValueTag;
    constructor(literal: string);
    getDepth(): number;
    toString(): string;
}
//# sourceMappingURL=integerValue.d.ts.map