import * as React from 'react';

import { Style } from '../types';

export interface TableProps extends Style { }

const Table: React.StatelessComponent<TableProps> = props => {
    return <div className={props.className}> {props.children} </div>;
};

export default Table;
