import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { HeadingProps } from '../presentation/heading';
import { CellProps } from '../presentation/cell';
import Heading from '../styled/heading';
import Row from '../styled/row';
import Cell from '../styled/cell';
import Table from '../styled/table';
import HeadingSection from '../styled/heading-section';
import RowSection from '../presentation/row-section';

import {
    MouseClickFunc,
    MouseEvent,
    SortOrder,
    ThemeProps,
    defaultTheme,
    TableColumn,
    Sort,
    TableCell
} from '../types';

interface OrderedRowProps {
    index: number;
    cells: TableCell[];
}

interface HeadingsAndRows {
    headings: HeadingProps[];
    rows: OrderedRowProps[];
}

export interface TableProps<T> {
    caption?: string;
    columns: TableColumn<T>[];
    data: T[];
    theme?: ThemeProps;
    defaultSort?: Sort;
    onHeadingClick?: MouseClickFunc;
    onRowClick?: MouseClickFunc;
    className?: string;
}

export interface TableState {
    columnSortName: string | undefined;
    columnSortOrder: SortOrder;
}

/**
 * Main table container component.
 *
 * @export
 * @class TableContainer
 * @extends {React.Component<TableProps<T>, TableState>}
 * @template T
 */
export default class TableContainer<T> extends React.Component<TableProps<T>, TableState> {

    public static defaultProps: TableProps<{}> = {
        theme: defaultTheme,
        columns: [],
        data: [],
    };

    constructor(props: TableProps<T>) {
        super(props);

        this.handleHeadingOnClick = this.handleHeadingOnClick.bind(this);
        this.handleRowOnClick = this.handleRowOnClick.bind(this);

        let column: string | undefined;
        let sortOrder: SortOrder = SortOrder.NONE;

        if (this.props.defaultSort !== undefined) {
            column = this.props.defaultSort.column;
            sortOrder = this.props.defaultSort.sortOrder;
        }

        this.state = {
            columnSortName: column,
            columnSortOrder: sortOrder,
        };
    }

    public render(): JSX.Element {

        const theme: ThemeProps = { ...defaultTheme, ...this.props.theme };

        const { headings, rows } = this.mapColumnsToRows();

        const tyble: JSX.Element =
            <Table className={this.props.className} caption={this.props.caption}>
                <HeadingSection>
                    {this.getHeadings(headings)}
                </HeadingSection>
                <RowSection>
                    {this.getRows(rows)}
                </RowSection>
            </Table>;

        if (this.props.className !== undefined) {
            return tyble;
        } else {
            return (
                <ThemeProvider theme={theme}>
                    {tyble}
                </ThemeProvider>
            );
        }
    }

    private getHeadings(headings: HeadingProps[]): JSX.Element[] {
        return headings.map((headingProps: HeadingProps, index: number) => {
            return <Heading key={index} {...headingProps} />;
        });
    }

    private getRows(rows: OrderedRowProps[]): JSX.Element[] {

        return rows.map((row: OrderedRowProps, rowIndex: number) => {
            const tableCellProps: TableCell[] = row.cells;
            const cells: {}[] = [];

            tableCellProps.map((cellProps: CellProps, cellIndex: number) => {
                const cell: JSX.Element = <Cell key={cellIndex} {...cellProps} />;
                cells.push(cell);
            });

            return <Row key={rowIndex} onClick={this.handleRowOnClick}>{cells}</Row>;
        });
    }

    private mapColumnsToRows(): HeadingsAndRows {

        const headings: HeadingProps[] = [];
        const rows: OrderedRowProps[] = [];
        const headingsAndRows: HeadingsAndRows = { headings, rows };

        this.props.columns.map((column: TableColumn<T>) => {

            const headingProps: HeadingProps = {
                ...column.heading,
                onClick: this.handleHeadingOnClick,
            };

            if (column.sort !== undefined && column.heading.content === this.state.columnSortName) {
                headingProps.showDescSortingIcon = this.state.columnSortOrder === SortOrder.DESC;
            }

            headingsAndRows.headings.push(headingProps);

            let dataProps: T[] = this.props.data;

            if (column.sort !== undefined && this.state.columnSortName === column.heading.content) {
                dataProps = column.sort(this.props.data, this.state.columnSortOrder);
            }

            dataProps.map((cellData: T, index: number) => {
                if (column.cells !== undefined) {

                    let row: OrderedRowProps = rows.filter((r: OrderedRowProps) => r.index === index)[0];
                    const cell: TableCell = { content: column.cells(cellData) };

                    if (row !== undefined) {
                        row.cells.push(cell);
                    } else {
                        row = { index, cells: [cell] };
                        headingsAndRows.rows.push(row);
                    }
                }
            });
        });

        return headingsAndRows;
    }

    private handleHeadingOnClick(e: MouseEvent, headingClickProps: { content?: string, isSortingEnabled: boolean }): void {

        if (headingClickProps.isSortingEnabled) {
            const { columnSortOrder } = this.state;

            const sortToggle: SortOrder = columnSortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;

            this.setState({
                columnSortName: headingClickProps.content,
                columnSortOrder: sortToggle,
            });

            if (this.props.onHeadingClick !== undefined) {
                this.props.onHeadingClick(e);
            }
        }
    }

    private handleRowOnClick(e: MouseEvent): void {

        if (this.props.onRowClick !== undefined) {
            this.props.onRowClick(e);
        }
    }

}
