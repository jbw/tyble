import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { SortOrder, Table, TableColumn } from '../src/components';

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

const sortFunc = (props: Person[], sortOrder: SortOrder) => {
   return props.sort((a: Person, b: Person) => {

        if (sortOrder === SortOrder.DESC) {
            return a.name > b.name ? 1 : -1;
        }
        return a.name < b.name ? 1 : -1;

    });
};

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
        cells: (props: Person) => <span>{props.name}</span>,
    },
    {
        heading: { content: 'Last' },
        cells: (props: Person) => <span>{props.lastname}</span>,
    },
    {
        heading: { content: 'Company' },
        cells: (props: Person) => <span>{props.company.name}</span>,
    },
];

// tslint:disable-next-line:no-unused-expression
/* injectGlobal`
body {
    font-family: 'Lato';
    margin: 0
}
`; */

ReactDOM.render(
    <Table columns={columns} data={data} />,
    document.getElementById('root'),
);
