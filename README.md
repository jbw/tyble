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

## Table of Contents

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

## Features

- Typed property selectors for cell data
- Customizable and controllable (React class, JSX, callbacks)
- Themeable (styled-components, sass)
- Column sorting and custom sorting functionality provided

## Installation

###  Yarn

```bash
yarn add tyble
```

###  NPM

```bash
npm i tyble
```

## Example

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

## Props

### Tyble

These are all of the props for `<Tyble />` component.

| Name           | Type                         | Description                                                              |
| -------------- | ---------------------------- | ------------------------------------------------------------------------ |
| data           | `T[]`                        | `T` is the type your data uses.                                          |
| columns        | `TableColumn<T>[]`           | Provide columns to shape and connect data to `tyble`.                    |
| theme          | `ThemeProps`                 | Override or replace default theme. By default it uses an internal theme. |
| defaultSort    | *optional* `SortFunc`        | If no sorting function is provided, no sorting will be available.        |
| onHeadingClick | *optional* `MouseClickFunc`  | Heading click callback.                                                  |
| onRowClick     | *optional*  `MouseClickFunc` | Row click callback.                                                      |
| className      | *optional* `string`          | Top level className for styling.                                         |

### Theme Props

Here are all the props and defaults for the `ThemeProps` object. Creating your own allows you to customize the default theme. You can also, if you prefer, create only a partial theme to only override certain parts.

| Name                 | Default           |
| -------------------- | ----------------- |
| headingFontColor     | #4a4a4a           |
| headingBgColor       | #f7f7f7           |
| headingFontFamily    | News Cycle        |
| headingFontSize      | 14px              |
| headingBorder        | 1px solid #e6e6e6 |
| headingCursor        | pointer           |
| headingTextTransform | uppercase         |
| headingPadding       | 15px              |
| rowSeparatorColor    | 1px solid #e6e6e6 |
| rowBgColor           | `none`            |
| rowAltBgColor        | red               |
| rowHoverColor        | #f5f8fc           |
| rowPadding           | 15px              |
| rowTextAlign         | center            |
| rowTransition        | all 0.5s ease     |
| cellFontSize         | 12px              |
| cellFontColor        | #4a4a4a           |
| cellBgColor          | `none`            |

## Types

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

## Data

Pass any data into `tyble` in an array. See below an example of what `data` might look like. This could be from an external web api etc.

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

## Columns

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

## Rendering

### Standard

```jsx
ReactDOM.render(
    <Table columns={columns} data={data} />,
    document.getElementById('root'),
);
```

### JSX Style

Alternatively you can write a `tyble` using JSX manually.

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

## Styling

There are a number of ways to style `tyble` we try to be unopinionated about styling and offer a few ways to do it.

- Sass
- Theme (`styled-components`)
- Overriding default theme

### Sass

```css
 .tyble {
    display: flex;
    flex-flow: column nowrap;
    flex: 1 1 auto;
    .heading-section {
        display: flex;
        cursor: pointer;
        border-top: 1px solid lightgray;
        .heading {
            display: flex;
            width: 100%;
            background: #ff8080;
            padding: 15px;
        }
    }
    .row {
        display: flex;
        padding: 15px;
        width: 100%;
        border-top: 1px solid lightgray;
        .cell {
            display: flex;
            flex-grow: 1;
            flex-basis: 0;
        }
    }
}
```

#### Classes

- tyble, heading-section, heading, row, cell

### Theme

You can pass a theme object to the `theme` prop to use your own.

### Override default theme
`tyble` ships with a clean and minimal theme but you can
override this style with your own.

## Tests and Linting

### Running the tests and linters

```bash
 yarn run test
```

```bash
 yarn run lint:ts
 yarn run lint:css
```

## Contributing

Please read [CONTRIBUTING](Contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## FAQ

- **Is this production ready?**

Until version `1.0.0` this component will not be production ready. It is being developed and changed at pace.
