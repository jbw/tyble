import * as React from 'react';

import { MouseEvent, Style } from '../types';

export interface RowProps extends Style {
    onClick?: any;
}

const Row: React.StatelessComponent<RowProps> = props => {

    const { onClick, className } = props;
    const classNames = ['row', className].join(' ');
    const handleClick = (e: MouseEvent) => {
        if (onClick) {
            onClick(e);
        }
    };

    return <div className={classNames} onClick={handleClick}> {props.children} </div>;
};

export default Row;
