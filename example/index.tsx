
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { injectGlobal, ThemeProvider } from 'styled-components';

import reactAxe from 'react-axe';

if (process.env.NODE_ENV !== 'production') {
    reactAxe(React, ReactDOM, 1000);
}

import Tyble, {
    CellStyled as Cell,
    RowStyled as Row,
    RowSection,
    HeadingStyled as Heading,
    HeadingSectionStyled as HeadingSection,
    TableStyled as Table,
    ThemeProps,
    TableColumn,
    SortOrder

} from 'tyble';

import { Person, Skill, Company } from './types';

import './theme.scss';

const data: Person[] = [
    {
        name: 'Jason',
        lastname: 'Watson',
        skills: [{ name: 'TypeScript', level: 100 }],
        company: { name: 'Caspian' },
    },
    {
        name: 'Charles',
        lastname: 'Xavier',
        skills: [{ name: 'Telepathy', level: 90 }],
        company: { name: 'X-Men' }
    },

];

type SortFunc = (props: Person[], sortOrder: SortOrder) => Person[];

const sortFunc: SortFunc = (props: Person[], sortOrder: SortOrder): Person[] => {
    return props.sort((a: Person, b: Person) => {

        if (sortOrder) {
            return a.name > b.name ? 1 : -1;
        }

        return a.name < b.name ? 1 : -1;

    });
};

const columns: TableColumn<Person>[] = [
    {
        heading: { content: 'First' },
        sort: sortFunc,
        cells: (props: Person): string => props.name,
    },
    {
        heading: { content: 'Last' },
        cells: (props: Person): string => props.lastname,
    },
    {
        heading: { content: 'Company' },
        cells: (props: Person): string => props.company.name,
    },
];

const sassThemed: JSX.Element =
    <Tyble
        columns={columns}
        data={data}
        className={'tyble'}
        defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
    />;

const defaultThemed: JSX.Element =
    <Tyble
        caption={'Summary of data'}
        columns={columns}
        data={data}
        defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
    />;

const theme: ThemeProps = {
    headingBgColor: 'blue'
};

const styledThemeOverride: JSX.Element =
    <Tyble
        columns={columns}
        data={data}
        theme={theme}
        defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
    />;

const jsxSass: JSX.Element =
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

const jsxStyledComponentCustomTheme: JSX.Element =
    <ThemeProvider theme={theme}>
        <Table>
            <HeadingSection>
                <Heading content='Heading 1' />
            </HeadingSection>
            <RowSection>
                <Row>
                    <Cell content='Cell 1' />
                    <Cell content='Cell 2' />
                    <Cell style='background:red' content='Cell 3' />
                </Row>
            </RowSection>
        </Table>
    </ThemeProvider>;

const jsxStyledComponentDefaultTheme: JSX.Element =
    <Table>
        <HeadingSection>
            <Heading content='Heading 1' />
        </HeadingSection>
        <RowSection>
            <Row>
                <Cell content='Cell 1' />
                <Cell content='Cell 2' />
                <Cell>Cell 3</Cell>
            </Row>
        </RowSection>
    </Table>;

ReactDOM.render(defaultThemed, document.getElementById('root'));
// ReactDOM.render(sassThemed, document.getElementById('root'));
// ReactDOM.render(styledThemeOverride, document.getElementById('root'));
// ReactDOM.render(jsxStyledComponentCustomTheme, document.getElementById('root'));
// ReactDOM.render(jsxStyledComponentDefaultTheme, document.getElementById('root'));
// ReactDOM.render(jsxSass, document.getElementById('root'));
