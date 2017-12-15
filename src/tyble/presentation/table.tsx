import * as React from 'react';

import { Style } from '../types';

export interface TableProps extends Style { }

const Table: React.StatelessComponent<TableProps> = props => {
    return <table className={props.className}>{props.children}</table>;
};

export default Table;
