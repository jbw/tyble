import * as React from 'react';

import { Style } from '../types';


export interface FilterProps extends Style {
    onFilter: any;
    name: string;
}

export const Filter: React.StatelessComponent<FilterProps> = props => {
    const classNames: string = ['filter', props.className].join(' ');

    const style = props.style !== undefined ? props.style : {};

    const handleClick = (e: any) => {
        props.onFilter(e, props.name);

    };

    return <input type="text" style={style} className={classNames} placeholder="Filter" onChange={handleClick} />;
};

export default Filter;
