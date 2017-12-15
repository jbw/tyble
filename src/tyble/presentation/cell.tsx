import * as React from 'react';

import { Style } from '../types';

export interface CellProps extends Style {
    content: string | JSX.Element;
}

export const Cell: React.StatelessComponent<CellProps> = props => {
    const classNames = ['cell', props.className].join(' ');
    return <div className={classNames}> {props.content} </div>;
};

export default Cell;
