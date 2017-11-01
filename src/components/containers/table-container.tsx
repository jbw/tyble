import * as React from 'react';

import Heading from '../core/heading';
import Row from '../core/row';
import TableWrapper from '../core/wrappers/table-wrapper';
import HeadingWrapper from '../core/wrappers/heading-wrapper';
import RowWrapper from '../core/wrappers/row-wrapper';

import {
    CellRender,
    MouseClickFunc,
    MouseEvent,
    Sortable,
    SortOrder,
} from '../core/types';

export interface TableColumn<T> extends Sortable<T> {
    heading: TableHeading;
    expander?: JSX.Element;
    cells?: CellRender<T>;
}

export interface TableProps<T> {
    columns: Array<TableColumn<T>>;
    data: T[];

    onHeadingClick?: MouseClickFunc;
    onRowClick?: MouseClickFunc;
}

export interface TableHeading {
    content: string;
    sortOrder?: SortOrder;
}

interface TableCell {
    content: JSX.Element;
}

export interface TableState {
    columnSortName: string | undefined;
    columnSortOrder: SortOrder;
}

interface OrderedRowProps {
    index: number;
    cells: TableCell[];
}

export default class Table<T> extends React.Component<TableProps<T>, TableState> {

    constructor(props: TableProps<T>) {
        super(props);

        this.handleHeadingOnClick = this.handleHeadingOnClick.bind(this);
        this.handleRowOnClick = this.handleRowOnClick.bind(this);

        this.state = {
            columnSortName: undefined,
            columnSortOrder: SortOrder.NONE,
        };

    }

    public render() {
        return (
            <TableWrapper>
                <HeadingWrapper>
                    {this.makeHeadings()}
                </HeadingWrapper>
                <RowWrapper>
                    {this.makeRows()}
                </RowWrapper>
            </TableWrapper>
        );
    }

    private makeHeadings(): JSX.Element[] {
        return this.props.columns.map((column: TableColumn<T>, index: number) => {

            let sortOrder: SortOrder = SortOrder.NONE;
            if (column.heading.content === this.state.columnSortName) {
                sortOrder = this.state.columnSortOrder;
            }

            return <Heading
                key={index}
                {...column.heading}
                onClick={this.handleHeadingOnClick}
                sortOrder={sortOrder}
            />;
        });
    }

    private makeRows(): JSX.Element[] {
        const rows: OrderedRowProps[] = this.mapColumnsToRows();

        return rows.map((row: OrderedRowProps, index: number) => {
            const cells: TableCell[] = row.cells;
            return <Row key={index} cells={cells} onClick={this.handleRowOnClick} />;
        });
    }

    private mapColumnsToRows(): OrderedRowProps[] {

        const rows: OrderedRowProps[] = [];

        this.props.columns.map((column: TableColumn<T>) => {

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
                        rows.push(row);
                    } else {
                        row.cells.push(cell);
                    }
                }
            });
        });

        return rows;
    }

    private handleHeadingOnClick(e: MouseEvent, heading: string) {

        if (this.state.columnSortOrder === SortOrder.ASC) {
            this.setState({
                columnSortName: heading,
                columnSortOrder: SortOrder.DESC,
            });
        } else if (this.state.columnSortOrder === SortOrder.DESC) {
            this.setState({
                columnSortName: heading,
                columnSortOrder: SortOrder.ASC,
            });
        } else {
            this.setState({
                columnSortName: heading,
                columnSortOrder: SortOrder.ASC,
            });
        }

        if (this.props.onHeadingClick) {
            this.props.onHeadingClick(e);
        }
    }

    private handleRowOnClick(e: MouseEvent) {

        if (this.props.onRowClick) {
            this.props.onRowClick(e);
        }
    }

}
