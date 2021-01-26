# json-schema-to-type

Translate a (static) JSON schema to a TypeScript type

## Usage

```TypeScript

import type { SchemaType } from '@collaborne/json-schema-to-type';

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
```

See the [test](./test) directory for some more examples.

Note that the `as const` are required; TypeScript will automatically have those when `import`-ing a schema from a file.

## License

```text
MIT License

Copyright (c) 2021 Collaborne B.V.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
