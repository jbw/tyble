import * as React from 'react';

import { MouseClickFunc, MouseEvent, Style } from '../types';

export interface RowProps extends Style {
    onClick?: MouseClickFunc;
}

const Row: React.StatelessComponent<RowProps> = props => {

    const { onClick, className } = props;
    const classNames: string = ['row', className].join(' ');
    const handleClick: MouseClickFunc = (e: MouseEvent) => {
        if (onClick !== undefined) {
            onClick(e);
        }
    };

    return <tr className={classNames} onClick={handleClick}>{props.children}</tr>;
};

export default Row;
