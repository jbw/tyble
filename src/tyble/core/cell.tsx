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

const CellStyled: StyledComponentClass<any, Cell> = styled(Cell as any) `
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  white-space: nowrap;
  min-width: 0;

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export default CellStyled;