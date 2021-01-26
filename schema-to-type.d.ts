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
type ArraySchema = {
	type: 'array';
	items?: Schema;
};
type PrimitiveSchema = {
	type: keyof SchemaTypeNames;
};

export type Schema = ObjectSchema|ArraySchema|PrimitiveSchema;

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

/**
 * Type created from a JSON schema definition
 *
 * Note that the `required` and `type` values must be constants (i.e. either the schema is loaded from a file, or the
 * `as const` syntax is used for these)
 */
export type SchemaType<S> =
	S extends ObjectSchema ? RequiredProperties<S> & OptionalProperties<S> & AdditionalProperties<S> :
	S extends ArraySchema ? (S extends { items: Schema } ? SchemaType<S['items']>[] : any[]) :
	S extends PrimitiveSchema ? SchemaTypeNames[S['type']] :
	S extends Schema ? 'BUG: Unsupported "type" value' : never;
