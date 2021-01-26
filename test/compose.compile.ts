import type { SchemaType, RecursiveAnyOf } from '../schema-to-type';

const AnyOf1 = {
	anyOf: [
		{ type: 'string' as const },
	],
};
type T1 = SchemaType<typeof AnyOf1>;
const t11: T1 = 'foo';
const t12: T1 = 23;

const AnyOf2 = {
	anyOf: [
		{ type: 'string' as const },
		{ type: 'number' as const },
	] as const,
};
type T2 = SchemaType<typeof AnyOf2>;
const t21: T2 = 'foo';
const t22: T2 = 23;

type Simple = [{ type: 'string' }];
type T3 = RecursiveAnyOf<Simple>
type Two = [{ type: 'string' }, { type: 'string' }];
type T4 = RecursiveAnyOf<Two>;

type TwoDifferent = [{ type: 'string' }, { type: 'number' }];
type T5 = RecursiveAnyOf<TwoDifferent>;
type T6 = RecursiveAnyOf<typeof AnyOf2['anyOf']>