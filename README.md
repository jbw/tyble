<h1 align="center">
<br>
Tyble
<br>
</h1>
<h2 align="center">

`tyble` is a typesafe React table written in TypeScript.

[![Master Status](https://travis-ci.org/jbw/tyble.svg?branch=master)](https://travis-ci.org/jbw/tyble)
[![Develop Status](https://travis-ci.org/jbw/tyble.svg?branch=develop)](https://travis-ci.org/jbw/tyble)
</h2>

# Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Example](#example)
- [Types](#types)
- [Data](#data)
- [Columns](#columns)
- [Rendering](#rendering)
- [Tests and Linting](#tests-and-linting)
- [Contributing](#contributing)
- [License](#license)
- [FAQ](#faq)

# Features

- Typed property selectors for cell data
- Customizable and controllable (React class, JSX, callbacks)
- Themeable (styled-components, sass)
- Column sorting and custom sorting functionality provided

# Installation

## Yarn

```bash
yarn add tyble
```

## NPM

```bash
npm i tyble
```

# Example

```jsx
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

ReactDOM.render(
    <Table columns={columns} data={data} />,
    document.getElementById('root'),
);
```

There are some more examples in the `example` directory.

# Types

You can define our interfaces and types to be used by `tyble`.

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

# Data

Example data to be passed into `tyble`. This could be from an external web api etc.

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

If you want sorting you can write a custom sorting method to enable it on a column.

```typescript
const sortFunc = (props: Person[], sortOrder: SortOrder) => {
   return props.sort((a: Person, b: Person) => {

        if (sortOrder === SortOrder.DESC) {
            return a.name > b.name ? 1 : -1;
        }
        return a.name < b.name ? 1 : -1;

    });
};
```

# Columns

Define your columns and use them to populate your cells. No
accessor id needed because we have type safety!

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
```

# Rendering

Standard

```jsx
ReactDOM.render(
    <Table columns={columns} data={data} />,
    document.getElementById('root'),
);
```

JSX Style

```jsx
<Table className={'tyble'}>
    <HeadingSection>
        <Heading content='Heading 1' />
    </HeadingSection>
    <RowSection>
        <Row>
            <Cell content='Cell 1' />
            <Cell content='Cell 2' />
            <Cell content='Cell 3' />
        </Row>
    </RowSection>
</Table>;
```

# Tests and Linting

## Running the tests and linters

```bash
 yarn run test
```

```bash
 yarn run lint:ts
 yarn run lint:css
```

# Contributing

Please read [CONTRIBUTING](Contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

# FAQ

**Is this production ready?**

Until version `1.0.0` this component will not be production ready. It is being developed and changed at pace.
