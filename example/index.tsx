import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

// tslint:disable-next-line:no-implicit-dependencies
import { SortOrder, Table, TableColumn } from 'tyble';

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

interface Sort {
    name: string;
    func: (props: any) => any;
}

const sorting: Sort[] = [
    {
        name: 'basic',
        func: (props: Person[]) => props.sort((a: Person, b: Person) => a.name > b.name ? 1 : -1),
    },
];

const personList: Person[] = [
    {
        name: 'Jason',
        lastname: 'Watson',
        skills: [{
            name: 'TypeScript',
            level: 100,
        }],
        company: {
            name: 'Caspian',
        },
    },
    {
        name: 'Bob',
        lastname: 'Smiths',
        skills: [{
            name: 'TypeScript',
            level: 50,
        }],
        company: {
            name: 'Microsoft',
        },
    },
    {
        name: 'Jeff',
        lastname: 'Button',
        skills: [{
            name: 'TypeScript',
            level: 50,
        }],
        company: {
            name: 'Microsoft',
        },
    },
];

const companyList: Company[] = [
    {
        name: 'Caspian',
    },
    {
        name: 'Microsoft',
    },
];

const columns: Array<TableColumn<Person>> = [
    {
        heading: {
            content: 'First',
            sortOrder: SortOrder.DESC,
        },

        sort: (props: Person[], sortOrder: SortOrder) =>
            props.sort((a: Person, b: Person) => {
                if (sortOrder === SortOrder.DESC) {
                    return a.name > b.name ? 1 : -1;
                }
                return a.name < b.name ? 1 : -1;
            }),
        cells: (props: Person) => <span> {props.name} </span>,
        expander: <div>Expander</div>,
    },
    {
        heading: {
            content: 'Last',
        },

        sort: (props: Person[], sortOrder: SortOrder) =>
            props.sort((a: Person, b: Person) => a.lastname > b.lastname ? 1 : -1),
        cells: (props: Person) => <span> {props.lastname} </span>,
        expander: <div>Expander</div>,
    },
    {
        heading: {
            content: 'Company',
        },
        cells: (props: Person) => <span> {props.company.name} </span>,
        sort: (props: Person[], sortOrder: SortOrder) =>
            props.sort((a: Person, b: Person) => {
                if (sortOrder === SortOrder.DESC) {
                    return a.company.name > b.company.name ? 1 : -1;
                }
                return a.company.name < b.company.name ? 1 : -1;
            }),

    },
];

const handleRowClick = (e: any) => { return; };
const handleHeadingClick = (e: any) => { return; };

// tslint:disable-next-line:no-unused-expression
injectGlobal`
body {
    font-family: 'Lato';
    margin: 0
}
`;

ReactDOM.render(
    <Table
        columns={columns}
        data={personList}
        onRowClick={handleRowClick}
        onHeadingClick={handleHeadingClick}
    />,
    document.getElementById('root'),
);
