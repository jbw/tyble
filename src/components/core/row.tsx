import * as React from 'react';
import styled from 'styled-components';

import Cell, { CellProps } from './cell';
import { MouseEvent, Style } from '../core/types';

export interface RowProps extends Style {
    cells: CellProps[];
    onClick?: any;
}
export class Row extends React.Component<RowProps> {

    constructor(props: RowProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        return (
            <div className={this.props.className} onClick={this.handleClick}>
                {this.makeCells()}
            </div>
        );
    }

    private makeCells(): JSX.Element[] {
        return this.props.cells.map((cell: CellProps, index: number) => {
            return <Cell
                key={index}
                content={cell.content}
                className={cell.className}
            />;
        });
    }

    private handleClick(e: MouseEvent) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    }

}

const RowStyled = styled(Row) `
    width: 100%;
    display: flex;
    border-top: 1px solid #e6e6e6;
    font-weight: lighter;
    text-align: left;
    padding: 15px;

    transition: all .5s ease;
    &:hover {
        background: #f5f8fc;
    }
`;

export default RowStyled;
