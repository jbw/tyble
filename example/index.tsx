
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal, ThemeProvider } from 'styled-components';

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

} from '../dist/tyble';

import { Person, Skill, Company } from './types';

import './theme.scss';

const data: any[] = [
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

const sortFunc = (props: Person[], sortOrder: SortOrder) => {
    return props.sort((a: Person, b: Person) => {

        if (sortOrder) {
            return a.name > b.name ? 1 : -1;
        }
        return a.name < b.name ? 1 : -1;

    });
};

const columns: Array<TableColumn<Person>> = [
    {
        heading: { content: 'First' },
        sort: sortFunc,
        cells: (props: Person) => <div>{props.name}</div>,
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

const sassThemed =
    <Tyble
        columns={columns}
        data={data}
        className={'tyble'}
        defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
    />;

const defaultThemed =
    <Tyble
        columns={columns}
        data={data}
        defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
    />;

const theme: ThemeProps = {
    headingBgColor: 'blue'
};

const styledThemeOverride =
    <Tyble
        columns={columns}
        data={data}
        theme={theme}
        defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
    />;

const jsxSass =
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

const jsxStyledComponentCustomTheme =
    <ThemeProvider theme={theme}>
        <Table>
            <HeadingSection>
                <Heading content='Heading 1' />
            </HeadingSection>
            <RowSection>
                <Row>
                    <Cell content='Cell 1' />
                    <Cell content='Cell 2' />
                    <Cell
                        content={<div style={{ background: 'red' }}>Cell 3</div>}
                    />
                </Row>
            </RowSection>
        </Table>
    </ThemeProvider>;

const jsxStyledComponentDefaultTheme =
    <Table>
        <HeadingSection>
            <Heading content='Heading 1' />
        </HeadingSection>
        <RowSection>
            <Row>
                <Cell content='Cell 1' />
                <Cell content='Cell 2' />
                <Cell
                    content={<div style={{ background: 'red' }}>Cell 3</div>}
                />
            </Row>
        </RowSection>
    </Table>;

ReactDOM.render(defaultThemed, document.getElementById('root'));
// ReactDOM.render(sassThemed, document.getElementById('root'));
// ReactDOM.render(styledThemeOverride, document.getElementById('root'));
// ReactDOM.render(jsxStyledComponentCustomTheme, document.getElementById('root'));
// ReactDOM.render(jsxStyledComponentDefaultTheme, document.getElementById('root'));
// ReactDOM.render(jsxSass, document.getElementById('root'));
