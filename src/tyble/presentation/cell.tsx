import * as React from 'react';

import { Style } from '../types';

export interface CellProps extends Style {
    content: string;
}

export const Cell: React.StatelessComponent<CellProps> = props => {
    const classNames: string = ['cell', props.className].join(' ');

    const style =  props.style || {};

    return <td style={style} className={classNames}>{props.content}</td>;
};

export default Cell;
