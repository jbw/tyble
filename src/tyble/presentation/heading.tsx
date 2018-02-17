import * as React from 'react';

import { HeadingClickEventFunc, MouseEvent, Style } from '../types';
import Filter from '../filter';

export interface HeadingProps extends Style {
    content?: string;
    onClick?: HeadingClickEventFunc;
    onFilterClick?: any;
    showDescSortingIcon?: boolean;
    filter?: any;
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

    const getFilter = () => {
        if (props.onFilterClick !== undefined && content !== undefined) {
            return <Filter onFilter={props.onFilterClick} name={content} />;
        }
    }
    return (
        <th scope='col' className={classNames} onClick={handleClick}>
            {content}
            {getFilter()}
        </th>
    );


};

export default Heading;
