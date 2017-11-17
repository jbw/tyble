import * as React from 'react';

import { Style } from '../types';

export interface HeadingSectionProps extends Style {
}

const HeadingSection: React.StatelessComponent<HeadingSectionProps> = props => {
    const classNames = ['heading-section', props.className].join(' ');
    return <div className={classNames}> {props.children} </div>;
};

export default HeadingSection;
