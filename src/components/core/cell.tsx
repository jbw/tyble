import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

import { Style } from '../core/types';

export interface CellProps extends Style {
    content: string | JSX.Element;
}

export class Cell extends React.Component<CellProps> {

    constructor(props: CellProps) {
        super(props);
    }

    public render() {
        return (
            <div className={this.props.className}>
                {this.props.content}
            </div>
        );
    }
}

const CellStyled: StyledComponentClass<CellProps, Cell> = styled(Cell) `
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    white-space: nowrap;
    min-width: 0px;

    span{
        text-overflow: ellipsis;
        overflow: hidden;
    }
`;

export default CellStyled;
