import * as React from 'react';

import { Style } from '../../core/types';

export interface RowWrapperProps extends Style {
    children?: any;
}

export default class RowWrapper extends React.Component<RowWrapperProps> {

    public render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
}
