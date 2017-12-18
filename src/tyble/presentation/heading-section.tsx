import * as React from 'react';

import { Style } from '../types';

export interface HeadingSectionProps extends Style { }

const HeadingSection: React.StatelessComponent<HeadingSectionProps> = (props: HeadingSectionProps & { children?: React.ReactChild }) => {
    const classNames: string = ['heading-section', props.className].join(' ');

    return <thead><tr className={classNames}>{props.children}</tr></thead>;
};

export default HeadingSection;
