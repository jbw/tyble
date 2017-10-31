import * as React from 'react';
import styled from 'styled-components';

import { Style } from '../../core/types';
import Heading, { HeadingProps } from '../heading';

export interface HeadingWrapperProps extends Style {
    children?: any;
}

export class HeadingWrapper extends React.Component<HeadingWrapperProps> {

    public render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}

const HeadingWrapperStyled = styled(HeadingWrapper) `
    font-family: 'News Cycle Bold', sans-serif;
    display: flex;
    width: 100%;
    cursor: pointer;
    padding: 15px;
    background: #f7f7f7;
    border-top: 1px solid #e6e6e6;
`;

export default HeadingWrapperStyled;
