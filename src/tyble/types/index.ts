
export type MouseEvent = React.MouseEvent<HTMLElement>;
export type MouseClickFunc = (e: MouseEvent) => void;
export type HeadingClickEventFunc = (e: MouseEvent, headingClickProps: { content?: string, isSortingEnabled?: boolean }) => void;
export type CellRender<T> = (props: T) => string;
export type ColumnSort<T> = (props: T, sortOrder: SortOrder) => T;

export interface Sortable<T> {
    sort?: ColumnSort<T[]>;
}

export interface TableColumn<T> extends Sortable<T> {
    heading: TableHeading;
    expander?: JSX.Element;
    cells?: CellRender<T>;
}

export interface TableHeading {
    content: string;
}

export interface TableCell {
    content: string;
}

export interface Sort {
    column: string;
    sortOrder: SortOrder;
}

export const defaultTheme: ThemeProps = {

    headingFontColor: '#4a4a4a',
    headingBgColor: '#f7f7f7',
    headingFontFamily: 'Montserrat',
    headingFontSize: '0.9em',
    headingFontWeight: 'normal',
    headingBorder: '1px solid #e6e6e6',
    headingCursor: 'pointer',
    headingTextTransform: 'uppercase',
    headingPadding: '0.8em',

    rowSeparatorColor: '1px solid #e6e6e6',
    rowBgColor: 'white',
    rowAltBgColor: undefined,
    rowFontFamily: 'Lato',
    rowHoverColor: '#f5f8fc',
    rowPadding: '0.8em',
    rowTextAlign: 'center',
    rowTransition: 'all 0.5s ease',

    cellFontSize: '0.8em',
    cellFontColor: '#4a4a4a',
    cellBgColor: undefined,

    captionBgColor: undefined,
    captionFontColor: undefined,
    captionPadding:  '.8em .8em'

};

export interface ThemeProps {

    headingFontColor?: string;
    headingBgColor?: string;
    headingFontFamily?: string;
    headingFontSize?: string;
    headingFontWeight?: string;
    headingCursor?: string;
    headingPadding?: string;
    headingTextTransform?: string;
    headingBorder?: string;

    rowSeparatorColor?: string;
    rowHoverColor?: string;
    rowBgColor?: string;
    rowFontFamily?: string;
    rowAltBgColor?: string;
    rowTextAlign?: string;
    rowPadding?: string;
    rowTransition?: string;

    cellFontSize?: string;
    cellFontColor?: string;
    cellBgColor?: string;

    captionFontColor?: string;
    captionBgColor?: string;
    captionPadding?: string;
}

export interface Style {
    className?: string;
    style?: string;
}

export enum SortOrder {
    ASC, DESC, NONE
}
