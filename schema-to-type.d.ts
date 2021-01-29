interface SchemaTypeNames {
	'string': string;
	'boolean': boolean;
	'number': number;
}

type NotIncluded<T, U> = T extends U ? never : T;
type Included<T, U> = T extends U ? T : never;

type ObjectSchema = {
	type: 'object';
	required?: string[];
	properties?: Record<string, Schema>;
	additionalProperties?: boolean|Schema;
};
type ArrayListSchema = {
	type: 'array';
	items: Schema;
};
type ArrayTupleSchema = {
	type: 'array';
	items: readonly Schema[];
};
type ArrayAnySchema = {
	type: 'array';
};
type ArraySchema = ArrayListSchema|ArrayTupleSchema|ArrayAnySchema;
type PrimitiveSchema = {
	type: keyof SchemaTypeNames;
};

type OneOfSchema = {
	oneOf: readonly Schema[];
};
type AnyOfSchema = {
	anyOf: readonly Schema[];
};
type AllOfSchema = {
	allOf: readonly Schema[];
};

export type Schema = ObjectSchema|ArraySchema|PrimitiveSchema|OneOfSchema|AnyOfSchema|AllOfSchema;

export type PropertyNames<S extends ObjectSchema> = keyof S['properties'];
export type RequiredPropertyNames<S extends ObjectSchema> = S extends { required: string[]; } ? Included<PropertyNames<S>, S['required'][number]> : never;
export type OptionalPropertyNames<S extends ObjectSchema> = S extends { required: string[]; } ? NotIncluded<PropertyNames<S>, S['required'][number]> : PropertyNames<S>;

export type PropertySchema<S extends ObjectSchema, k extends PropertyNames<S>> = S['properties'][k];

export type RequiredProperties<S extends ObjectSchema> = {
	[k in RequiredPropertyNames<S>]: SchemaType<PropertySchema<S, k>>;
}
export type OptionalProperties<S extends ObjectSchema> = {
	[k in OptionalPropertyNames<S>]?: SchemaType<PropertySchema<S, k>>;
}
export type AdditionalProperties<S extends ObjectSchema> =
	S extends { additionalProperties: true; } ? {[k: string]: any} :
	S extends { additionalProperties: Schema; } ? {[k: string]: SchemaType<S['additionalProperties']>} :
	{};

// Taken from https://www.typescriptlang.org/play?target=6&jsx=0&ts=4.0.2&ssl=28&ssc=11&pln=22&pc=1#code/PQKhCgAIUgVALAlgZ0gYwPYBMCmlcC2GAdsgC4BOAhmTqlZAESwCeADnoqWVcWYjUQlIKSDgAeaOskQA3HABsW+HDjaReWSGwzIZAIyUjiAMy6JajMRQoYKxyLIAsAOgAMLgExQYPuPDwAcxxiHGpaLQApAGV0bDwKAFdSOJscNDIlFz8EPDJ2OkhkeAwAd2IHMgDIMgwMBX42VAU6gGtIAHkAaWzofzwSIzZbQxwCEVQqvDDbCl7fPoBJMkgCKmV9BMUaHC1ayESZYkCNCqpkFmI0SGDQ8LtIEwepkQI2BTGQnn4SAH5-vwAJTGGFkXBOL0Qbw+BC+gmEmkgFDUCioaHBIhWpQs8FOYgAjok5FQPnwVGhUeEhBUABQSKRsFZPewvEAASjECihXB2k2qMzsPh8wHA4HyHEgi1MYWWYRodgAaiTEjgADywAB8kAAvFBIPrYGJxLRiFhULLqKNVVwTGFIAq3Frfva3JAAFx6g1Gk1myW0e4Ua3S+wKgCMTvtofdnrg3pCvoAghcrhaqFabXaFZ4I1no-qvRIfagk5c0KnaoGMyGAMw56t5-OheQUADcovFeAAMiFAlV1XHTahkq1iGViABtAC6Wu1cHHAHJSb34PPJ22xQVIAAJHBULD9wvxofEEdjqcz2OHweQcfD0flAA0kBcL7vZ8nk8gztg47cn7dkBNmE64dnAVCIAoB7GkeBwnveE7TjqMbAMAKijgAtFyfDoYggSjsigEYOhEjvIg6JkOhvAsDGNI0i+LhkABsActqWpvuUHJXr6tGMacLBPvRPAQQBVYuixbFwWOHK-DGDoNvqQGtu2m4AArIhwpqqgAok+hpccep7lOeSH5pAtEBHuAE6c+L5UBQgTIEx4mwYZxCcdB160fRdkOSJwZiTqEmudJLrunAIGbsCzbIGqekeb67EIU+HQDglklGZ+s7GbOADeMZuABUVhDF6rgZBmpPmpajxqqO57uqGrJRqGoxqGAEdOAAC+47dscfaaqlqCus6UYAX+EUSgAWogbDAsgiQNFBRYufBU5PnNC0rPpK3vjqN6Ibl+UAdNs10JtpUQQ1lXqTVNJSraFDloqypqnV+6alqAA+sG4GYoRYGy61nQ0zUPq1hU4NFaobSDXU9T2-Vattw2QKNkDjaKKGQFpgKAh0gJMZuXDkLw-DwhUoj0tIciKMouBqKcWg6HoiCGMoNrmLQ4BY7gGFYRRuH4XgGEkVy5GUcQLDoQAIos0QJgAQp2WnS+A5ylo8yQZNSMAAF4zUtMGJeedEvhYcqjI5cBsgBJYpv6aYfKqJ0w2QDVanlpk8yERH8zheF2MLRGi2RFgS9RpkfCs5sBqgs4x47dAuGsbA0gnoyBWZ6cfBo9CS2y47RCwBD6PULjq-bcoVpONJsmybaRzg0dkHHZlUKU4ErGpGAECgODlwoChpw7FbIHXydUKnFiZzSOX4CQOAASYJIxU+CcViJKydXXDf5lHSJjOBxAYvHLcuEuVS7-qpRIDnNKUCqHKe6Ze9Nwf80NHtU5Xy-zJmfv08MAmExGPSAz8X4v0QMA4eLgsALyfjGCBEDkQfzIC4Nghx4A0mSL9Lgux66IKQZ1TkMUwGEKQa-FYaBEhpDJLOdundMQuHXnYFwoRjS1x-hQ0yUCzLUNoWguBoQEHcNEUwoReBZwPxwFwsRpl0LoWRGscwxxZGiM6uQ7hKDNroMwTSfhyI+AuFkC9AhciNEUIsUg3hNIlFH3BCIsR3s+ZcAFgHAiItxCkXFlRTRpkWCIEUFobRn9zh8TUZAYhihSHgK0U3GhxAIlWP1BojR3NULAneGiDEkJoSfD4OTSA2Iqg1CQKgXAFI7KFKUaCQoLwBQUHSRUykeATBax+BUfWbBDbXmNtOU25d7JW2YrbZMZYHZWhdsDN2H11z73EHtLpNJxyMCoIwJ8jB9DrKYGgRgk4nzjlDA+TwD5qyTgIeAIAA
type Length<T extends readonly any[]> = T['length'];
type Head<T extends readonly unknown[]> = T extends [unknown, ...unknown[]] ? T[0] : never;
type Tail<T extends readonly unknown[]> =
	((...t: T) => unknown) extends ((t: any, ...tail: infer V0) => unknown) ?
	V0 :
	never;

type RecursiveAnyOf<A extends readonly Schema[]> = {
	0: never,
	1: SchemaType<A[0]>|RecursiveAnyOf<Tail<A>>,
}[Length<A> extends 0 ? 0 : 1];
// XXX: We cannot easily express "exactly one of these", so just cheat.
type RecursiveOneOf<A extends readonly Schema[]> = RecursiveAnyOf<A>;

type RecursiveAllOf<A extends readonly Schema[]> = {
	0: never,
	1: SchemaType<A[0]>&RecursiveAllOf<Tail<A>>,
}[Length<A> extends 0 ? 0 : 1];

type RecursiveItems<A extends readonly Schema[]> = {
	0: [],
	1: [SchemaType<A[0]>, ...RecursiveItems<Tail<A>>],
}[Length<A> extends 0 ? 0 : 1];

type ArrayItemsType<I> =
	I extends Schema ? SchemaType<I>[] :
	I extends readonly Schema[] ? RecursiveItems<I> :
	any[];

/**
 * Type created from a JSON schema definition
 *
 * Note that the `required` and `type` values must be constants (i.e. either the schema is loaded from a file, or the
 * `as const` syntax is used for these)
 */
export type SchemaType<S> =
	S extends ObjectSchema ? RequiredProperties<S> & OptionalProperties<S> & AdditionalProperties<S> :
	S extends ArrayListSchema ? SchemaType<S['items']>[] :
	S extends ArrayTupleSchema ? RecursiveItems<S['items']> :
	S extends ArrayAnySchema ? any[] :
	S extends PrimitiveSchema ? SchemaTypeNames[S['type']] :
	S extends AllOfSchema ? RecursiveAllOf<S['allOf']> :
	S extends OneOfSchema ? RecursiveOneOf<S['oneOf']> :
	S extends AnyOfSchema ? RecursiveAnyOf<S['anyOf']> :
	S extends Schema ? 'BUG: Unsupported "type" value' : 'Not a JSON Schema';
