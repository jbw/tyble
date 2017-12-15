import * as React from 'react';

import { Style } from '../types';

export interface RowSectionProps extends Style {
}

const RowSection: React.StatelessComponent<RowSectionProps> = props => {
    const classNames = ['row-section', props.className].join(' ').trim();

    return <tbody className={classNames}>{props.children}</tbody>;
};

export default RowSection;
