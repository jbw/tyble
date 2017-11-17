import * as React from 'react';

import { MouseEvent, Style } from '../types';

export interface HeadingProps extends Style {
    content?: string;
    onClick?: any;
    showDescSortingIcon?: boolean;
}

export const Heading: React.StatelessComponent<HeadingProps> = props => {

    const { content, className, showDescSortingIcon, onClick } = props;
    const classNames = ['heading', className].join(' ');

    const handleClick = (e: MouseEvent) => {
        if (onClick) {
            const isSortingEnabled = showDescSortingIcon !== undefined;
            onClick(e, { isSortingEnabled, content });
        }
    };

    return <div className={classNames} onClick={handleClick}>{content}</div>;

};

export default Heading;
