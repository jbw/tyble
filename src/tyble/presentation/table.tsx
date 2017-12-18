import * as React from 'react';

import { Style } from '../types';

export interface TableProps extends Style { caption?: string; }

const Table: React.StatelessComponent<TableProps> = props => {
    return (
        <table className={props.className}>
          {props.caption !== undefined ? <caption>{props.caption}</caption> : undefined}
          {props.children}
        </table>);
};

export default Table;
