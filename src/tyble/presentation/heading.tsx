import * as React from 'react';

import { HeadingClickEventFunc, MouseEvent, Style } from '../types';

export interface HeadingProps extends Style {
    content?: string;
    onClick?: HeadingClickEventFunc;
    showDescSortingIcon?: boolean;
}

/**
 *
 * @param props
 */
export const Heading: React.StatelessComponent<HeadingProps> = (props: HeadingProps) => {

    const { content, className, showDescSortingIcon, onClick } = props;
    const classNames: string = ['heading', className].join(' ');

    const handleClick = (e: MouseEvent) => {
        if (onClick !== undefined) {
            const isSortingEnabled: boolean = showDescSortingIcon !== undefined;
            onClick(e, { isSortingEnabled, content });
        }
    };

    return <th scope='col' className={classNames} onClick={handleClick}>{content}</th>;

};

export default Heading;
