# Tyble

[![Master Status](https://travis-ci.org/jbw/tyble.svg?branch=master)](https://travis-ci.org/jbw/tyble)
[![Develop Status](https://travis-ci.org/jbw/tyble.svg?branch=develop)](https://travis-ci.org/jbw/tyble)

`tyble` is a typesafe React table written in TypeScript.


## Features
* Typed property selectors
* Column sorting
* Consume any data structure

## Installation

### Yarn
```
yarn add tyble
```

### NPM

```
npm i tyble
```

## Example


### Types

```typescript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Tyble, SortOrder, TableColumn } from 'tyble';

interface Person {
    name: string;
    lastname: string;
    skills: Skill[];
    company: Company;
}

interface Skill {
    name: string;
    level: number;
}

interface Company {
    name: string;
}

```

### Data
```typescript
const data: Person[] = [
    {
        name: 'Jason',
        lastname: 'Watson',
        skills: [{  name: 'TypeScript',  level: 100 }],
        company: {  name: 'Caspian' },
    },
    {
        name: 'Charles',
        lastname: 'Xavier',
        skills: [{ name: 'Telepathy', level: 90}],
        company: {  name: 'X-Men' },
    },
];
```

```typescript

const sortFunc = (props: Person[], sortOrder: SortOrder) => {
    props.sort((a: Person, b: Person) => {

        if (sortOrder === SortOrder.DESC) {
            return a.name > b.name ? 1 : -1;
        }
        return a.name < b.name ? 1 : -1;

    });
};
```


### Columns

```jsx
const columns: Array<TableColumn<Person>> = [
    {
        heading: {
            content: 'First',
            sortOrder: SortOrder.DESC,
        },
        sort: sortFunc,
        cells: (props: Person) => <span>{props.name}</span>
    },
    {
        heading: { content: 'Last' },
        cells: (props: Person) => <span>{props.lastname}</span>
    },
    {
        heading: { content: 'Company' },
        cells: (props: Person) => <span>{props.company.name}</span>
    },
];

<Tyble data={data} columns={columns} />;

```

## Running the tests

```
 yarn run test
```

```
 yarn run lint:ts
 yarn run lint:css
```

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.


## Versions

* 0.1.5 (Not production ready)

## FAQ


### Is this production ready?

No


## API
