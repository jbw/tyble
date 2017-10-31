import * as React from 'react';
import styled from 'styled-components';

import { MouseClickFunc, MouseEvent, Sortable, SortOrder, Style } from '../core/types';
import Cell, { CellProps } from './cell';

export interface HeadingProps extends Style {
    content: string;
    onClick?: any;
    sortOrder?: SortOrder;
}

export class Heading extends React.Component<HeadingProps> {

    constructor(props: HeadingProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        const { content, className } = this.props;
        return (
            <div className={this.props.className} onClick={this.handleClick}>
                {this.getSortOrderElement()}
                <Cell content={content} />
            </div>
        );
    }

    private getSortOrderElement() {
        if (this.props.sortOrder === SortOrder.DESC) {
            return <HeaderSortDesc />;
        } else if (this.props.sortOrder === SortOrder.ASC) {
            return <HeaderSortAsc />;
        }
    }

    private handleClick(e: MouseEvent) {
        if (this.props.onClick) {
            this.props.onClick(e, this.props.content);
        }
    }

}

const HeaderSortDesc = styled.div`
    padding-right: 10px;
    &:after{
        content: '\\2193';
    }
`;

const HeaderSortAsc = styled.div`
    padding-right: 10px;
    &:after{
        content: '\\2191';
    }
`;

export const HeadingStyled = styled(Heading) `
    display: flex;
    width: 100%;
    text-transform: uppercase;
    font-size: 14px;
    color: #4a4a4a;

`;

export default HeadingStyled;
