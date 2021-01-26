import { SchemaType, PropertyNames, RequiredPropertyNames, OptionalPropertyNames, RequiredProperties, OptionalProperties } from '../schema-to-type';

const S1 = { type: 'array' as const, items: { type: 'string' as const } };
type T1 = SchemaType<typeof S1>;

const S2 = { type: 'object' as const, properties: { foo: { type: 'string' as const }, bar: { type: 'number' as const }}, required: ['foo' as const]};
type N2 = PropertyNames<typeof S2>;
type R2 = RequiredPropertyNames<typeof S2>;
type RP2 = RequiredProperties<typeof S2>;
type O2 = OptionalPropertyNames<typeof S2>;
type OP2 = OptionalProperties<typeof S2>;
type T2 = SchemaType<typeof S2>;

const S3 = { type: 'object' as const, properties: { foo: { type: 'string' as const }}, additionalProperties: true };
type T3 = SchemaType<typeof S3>;

const S4 = { type: 'object' as const, properties: { foo: { type: 'string' as const }}, additionalProperties: { type: 'number' as const } };
type T4 = SchemaType<typeof S4>;

function getNumberKey(o: T4): number {
    return o['dummy'];
}

const S5 = { type: 'blabla' as const };
type T5 = SchemaType<typeof S5>;
