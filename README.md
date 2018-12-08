# Object-deep-key
Safely access and modify deeply nested object properties

## Installation
**npm:** `$ npm install --save object-deep-key`

## Usage

```javascript
import objectDeepKey from 'object-deep-key';

const values = {
    id: '1',
    stuff: [1, 2, 3],
    methods: {
        id: '2',
        options: [
            { id: '123', type: 'Friend' },
            { id: '224', type: 'Foe' },
        ],
    },
};


objectDeepKey(values, 'methods.id').get(); // '2'
objectDeepKey(values, 'methods.options[1].id').get(); // '224'

objectDeepKey(values, 'methods.id').has(); // true
objectDeepKey(values, 'methods.unknown').has(); // false

objectDeepKey(values, 'methods.id').set('3');
objectDeepKey(values, 'methods.stuff[0]').set(200);
```
