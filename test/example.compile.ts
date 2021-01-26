import { SchemaType } from '../schema-to-type';

const SCHEMA = {
    type: 'object' as const,
    properties: {
        p1: {
            type: 'string' as const,
        },
        p2: {
            type: 'object' as const,
            properties: {
                foo: {
                    type: 'boolean' as const,
                },
            },
        },
        p3: {
            type: 'array' as const,
            items: {
                type: 'number' as const,
            },
        },
    },
    required: [
        'p1',
    ],
    additionalProperties: true as const,
}

function processSchema(o: SchemaType<typeof SCHEMA>) {
    // p1 is required, so no need to check
    console.log(o.p1);
    // p2 is optional, so requires '?'
    console.log(o.p2?.foo);
    // p3 is an optional array
    console.log((o.p3 || []).length);

    // dummy is "any"
    console.log(o.dummy);
}
