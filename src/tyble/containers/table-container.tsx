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
    columns: Array<TableColumn<T>>;
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

export default class TableContainer<T> extends React.Component<TableProps<T>, TableState> {

    public static defaultProps: TableProps<any> = {
        theme: defaultTheme,
        columns: [],
        data: [],
    };

    constructor(props: TableProps<T>) {
        super(props);

        this.handleHeadingOnClick = this.handleHeadingOnClick.bind(this);
        this.handleRowOnClick = this.handleRowOnClick.bind(this);

        let column;
        let sortOrder = SortOrder.NONE;

        if (this.props.defaultSort) {
            column = this.props.defaultSort.column;
            sortOrder = this.props.defaultSort.sortOrder;
        }

        this.state = {
            columnSortName: column,
            columnSortOrder: sortOrder,
        };

    }

    public render() {

        const theme = { ...defaultTheme, ...this.props.theme };

        const { headings, rows } = this.mapColumnsToRows();

        const tyble =
            <Table className={this.props.className}>
                <HeadingSection>
                    {this.getHeadings(headings)}
                </HeadingSection>
                <RowSection>
                    {this.getRows(rows)}
                </RowSection>
            </Table>;

        if (this.props.className) {
            return tyble;
        } else {
            return (
                <ThemeProvider theme={theme}>
                    {tyble}
                </ThemeProvider>
            );
        }

    }

    private getHeadings(headings: any): JSX.Element[] {
        return headings.map((headingProps: HeadingProps, index: number) => {
            return <Heading key={index} {...headingProps} />;
        });
    }

    private getRows(rows: any): JSX.Element {

        return rows.map((row: OrderedRowProps, rowIndex: number) => {
            const tableCellProps: TableCell[] = row.cells;
            const cells: any[] = [];

            tableCellProps.map((cellProps: CellProps, cellIndex: number) => {
                const cell = <Cell key={cellIndex} {...cellProps} />;
                cells.push(cell);
            });

            return <Row key={rowIndex} onClick={this.handleRowOnClick}> {cells} </Row>;
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

            if (column.sort && column.heading.content === this.state.columnSortName) {
                headingProps.showDescSortingIcon = this.state.columnSortOrder === SortOrder.DESC;
            }

            headingsAndRows.headings.push(headingProps);

            let dataProps: T[] = this.props.data;

            if (column.sort && this.state.columnSortName === column.heading.content) {
                dataProps = column.sort(this.props.data, this.state.columnSortOrder);
            }

            dataProps.map((cellData: T, index: number) => {
                if (column.cells) {

                    let row: OrderedRowProps = rows.filter((r: OrderedRowProps) => r.index === index)[0];
                    const cell: TableCell = { content: column.cells(cellData) };

                    if (!row) {
                        row = { index, cells: [cell] };

                        headingsAndRows.rows.push(row);
                    } else {
                        row.cells.push(cell);
                    }
                }
            });
        });

        return headingsAndRows;
    }

    private handleHeadingOnClick(e: MouseEvent, headingClickProps: any) {
        if (headingClickProps.isSortingEnabled) {
            const { columnSortOrder } = this.state;

            const sortToggle = columnSortOrder === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC;

            this.setState({
                columnSortName: headingClickProps.content,
                columnSortOrder: sortToggle,
            });

            if (this.props.onHeadingClick) {
                this.props.onHeadingClick(e);
            }
        }
    }

    private handleRowOnClick(e: MouseEvent) {

        if (this.props.onRowClick) {
            this.props.onRowClick(e);
        }
    }

}
