import { SchemaType, RecursiveItems, Schema, ArraySchema } from '../schema-to-type';

const S1 = { type: 'array' as const };
type T1 = SchemaType<typeof S1>;

const S2 = { type: 'array' as const, items: { type: 'string' as const }};
type T2a = typeof S2 extends ArraySchema ? 'Extends' : 'Does not extend';
const vT2a: T2a = 'Extends';
type T2b = SchemaType<typeof S2>;

const S3 = { type: 'array' as const, items: [{ type: 'string' as const }, { type: 'number' as const }] as const };
type T3a = typeof S3 extends ArraySchema ? 'Extends' : 'Does not extend';
const vT3a: T3a = 'Extends';
type T3b = SchemaType<typeof S3>;

type T4 = RecursiveItems<[{type: 'string' }]>;
type T5 = RecursiveItems<[{type: 'string' }, {type: 'string'}]>;
type T6 = RecursiveItems<[{type: 'string' }, {type: 'number'}]>;
type T7a = { items: [{type: 'string' }, {type: 'number'}] } extends { items: readonly Schema[] } ? 'Extends' : 'Does not extend';
const vT7a: T7a = 'Extends';
type T7b = { items: [{type: 'string' }, {type: 'number'}] } extends { items: Schema } ? 'Extends' : 'Does not extend';
const vT7b: T7b = 'Does not extend';
type T8a = { items: [{type: 'string' }, {type: 'number'}] } extends ArraySchema ? 'Extends' : 'Does not extend';
const vT8a: T8a = 'Does not extend';
type T8b = { type: 'array', items: [{type: 'string' }, {type: 'number'}] } extends ArraySchema ? 'Extends' : 'Does not extend';
const vT8b: T8b = 'Extends';
