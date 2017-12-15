import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { shallow, configure } from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import * as renderer from 'react-test-renderer';

import Tyble, {
    CellStyled as Cell,
    RowStyled as Row,
    RowSection,
    HeadingStyled as Heading,
    HeadingSectionStyled as HeadingSection,
    TableStyled as Table,
    ThemeProps,
    TableColumn,
    SortOrder,
    MouseEvent

} from '../src/tyble';

import './theme.scss';

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
            name: 'TypeScript', level: 100,
        }],
        company: {
            name: 'Caspian',
        },
    },
    {
        name: 'Charles',
        lastname: 'Xavier',
        skills: [{
            name: 'TypeScript', level: 90,
        }],
        company: {
            name: 'X-Men',
        },
    },
];

const sortFunc = (props: Person[], sortOrder: SortOrder): Person[] => {
    return props.sort((a: Person, b: Person) => {
        return sortOrder === SortOrder.DESC ? (a.name > b.name ? 1 : -1) : (a.name < b.name ? 1 : -1);
    });
};

const columns: TableColumn<Person>[] = [
    {
        heading: { content: 'First' },
        sort: sortFunc,
        cells: (props: Person): string => props.name
    },
    {
        heading: { content: 'Last' },
        cells: (props: Person): string => props.lastname
    },
    {
        heading: { content: 'Company' },
        cells: (props: Person): string => props.company.name
    },
];

const theme: ThemeProps = {

    headingFontColor: '#4a4a4a',
    headingBgColor: ' #f7f7f7',
    headingFontFamily: 'News Cycle',
    headingFontSize: '16px',

    rowSeparatorColor: 'black',

    cellFontSize: '14px',
    cellFontColor: 'orange',
    cellBgColor: 'purple',

};

import * as axe from 'axe-core';

describe('Module', () => {
    it('should have no accessibility violations', () => {
        const component = renderer.create(<Tyble data={data} columns={columns} />);
        axe.a11yCheck(component, {}, (results: axe.AxeResults) => {
            expect(results.violations.length).toBe(1);
        });
    });
});

describe('table', () => {
    it('should contain data passed to it ', () => {

        const component = renderer.create(<Tyble data={data} columns={columns} />);
        const tree = component.toJSON();

        expect(tree).toMatchSnapshot();

    });

    it('create normal JSX', () => {

        const style: string = 'background:red';

        const jsxStyledComponentDefaultTheme: JSX.Element =
            <Table>
                <HeadingSection>
                    <Heading content='Heading 1' />
                </HeadingSection>
                <RowSection>
                    <Row>
                        <Cell content='Cell 1' />
                        <Cell content='Cell 2' />
                        <Cell style={style} content='Cell 3' />
                    </Row>
                </RowSection>
            </Table>;

        const component = renderer.create(jsxStyledComponentDefaultTheme);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const rowLength: number = tree.children[1].children.length;
        const row = tree.children[1].children[0];
        const cellStyleValue = row.children[2].props.style;

        expect(cellStyleValue).toEqual('background:red');
        expect(rowLength).toEqual(1);

    });

    it('create theme provided JSX', () => {

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
                        </Row>
                    </RowSection>
                </Table>
            </ThemeProvider>;

        const component = renderer.create(jsxStyledComponentCustomTheme);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it('create JSX component with SASS styling', () => {
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

        const component = renderer.create(jsxSass);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        const topLevelclassName = tree.props.className;
        expect(topLevelclassName).toContain('tyble');

        const headingClassName = tree.children[0].children[0].children[0].props.className;
        expect(headingClassName).toContain('heading');
    });

    it('create Tyble component with a theme', () => {

        const wrapper = shallow(
            <Tyble
                columns={columns}
                data={data}
                theme={theme}
                defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
            />);

        expect(wrapper).toMatchSnapshot();
    });

    it('create Tyble component with default sort.', () => {

        const wrapper = shallow(
            <Tyble
                columns={columns}
                data={data}
                defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
            />);

        expect(wrapper).toMatchSnapshot();
    });

    it('create Tyble component with SASS style', () => {

        const wrapper = shallow(
            <Tyble
                columns={columns}
                data={data}
                className={'tyble'}
                defaultSort={{ column: 'First', sortOrder: SortOrder.ASC }}
            />);

        expect(wrapper).toMatchSnapshot();
    });

    it('should sort DESC and ASC', () => {
        const component = renderer.create(<Tyble data={data} columns={columns} />);
        const tree = component.getInstance();
        tree.handleHeadingOnClick(undefined, { isSortingEnabled: true, content: 'First' });
        expect(component.toJSON()).toMatchSnapshot();

    });

    it('should render without a theme', () => {

        const wrapper = renderer.create(<Tyble data={data} columns={columns} theme={undefined} />);
        expect(wrapper).toMatchSnapshot();

    });

    it('should work with a theme', () => {

        const wrapper = shallow(<Tyble data={data} columns={columns} theme={theme} />);
        expect(wrapper).toBeDefined();

    });

    it('should work when assigned a partial custom theme', () => {

        const partial = theme;
        partial.headingFontFamily = undefined;

        const wrapper = shallow(<Tyble data={data} columns={columns} theme={partial} />);

    });

});
