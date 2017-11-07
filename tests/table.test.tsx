import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as renderer from 'react-test-renderer';

import { Tyble, SortOrder, TableColumn } from '../src/tyble';

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
        skills: [{
            name: 'TypeScript',
            level: 100,
        }],
        company: {
            name: 'Caspian',
        },
    },
    {
        name: 'Charles',
        lastname: 'Xavier',
        skills: [{
            name: 'TypeScript',
            level: 90,
        }],
        company: {
            name: 'X-Men',
        },
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
    },
    {
        heading: {
            content: 'Last',
        },
        sort: (props: Person[], sortOrder: SortOrder) =>
            props.sort((a: Person, b: Person) => {
                if (sortOrder === SortOrder.DESC) {
                    return a.lastname > b.lastname ? 1 : -1;
                }
                return a.lastname < b.lastname ? 1 : -1;
            }),
        cells: (props: Person) => <span> {props.lastname} </span>,
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

const getTopRowLastNameColumnCellContent = (componentJson: any) => {
    const row = componentJson.children[1].children;
    const cells = row[0].children;
    const cell = cells[1];
    const cellData = cell.children[0].children.join('');
    return cellData;
};

describe('table', () => {
    it('should contain data passed to it ', () => {

        const component = renderer.create(<Tyble data={data} columns={columns} />);
        const tree = component.toJSON();

        const row = tree.children[1].children;
        expect(row.length).toEqual(2);

        const cells = row[0].children;
        expect(cells.length).toEqual(3);

        const cell = cells[0];
        const cellData = cell.children[0].children.join('');
        expect(cellData).toEqual(' Jason ');

    });

    it('should sort ASC and DESC', () => {
        const component = renderer.create(<Tyble data={data} columns={columns} />);
        const tree: any = component.toTree().instance;

        const unsortedCellContent = getTopRowLastNameColumnCellContent(component.toJSON());
        expect(unsortedCellContent).toEqual(' Watson ');

        tree.handleHeadingOnClick(undefined, 'Last');

        const sortedCellContent = getTopRowLastNameColumnCellContent(component.toJSON());
        expect(sortedCellContent).toEqual(' Xavier ');

        tree.handleHeadingOnClick(undefined, 'Last');

        const againSortedCellContent = getTopRowLastNameColumnCellContent(component.toJSON());
        expect(againSortedCellContent).toEqual(' Watson ');

    });
});
