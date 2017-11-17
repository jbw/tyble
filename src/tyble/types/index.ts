export type MouseEvent = React.MouseEvent<HTMLDivElement>;
export type MouseClickFunc = (e: MouseEvent) => void;
export type CellRender<T> = (props: T) => JSX.Element;
export type ColumnSort<T> = (props: T, sortOrder: SortOrder) => T;

export interface TableColumn<T> extends Sortable<T> {
    heading: TableHeading;
    expander?: JSX.Element;
    cells?: CellRender<T>;
}

export interface TableHeading {
    content: string;
}

export interface TableCell {
    content: JSX.Element | string;
}

export interface Sort {
    column: string;
    sortOrder: SortOrder;
}

export const defaultTheme: ThemeProps = {

    headingFontColor: '#4a4a4a',
    headingBgColor: ' #f7f7f7',
    headingFontFamily: 'News Cycle',
    headingFontSize: '14px',
    headingBorder: '1px solid #e6e6e6',
    headingCursor: 'pointer',
    headingTextTransform: 'uppercase',
    headingPadding: '15px',

    rowSeparatorColor: '1px solid #e6e6e6',
    rowBgColor: undefined,
    rowAltBgColor: 'red',
    rowHoverColor: '#f5f8fc',
    rowPadding: '15px',
    rowTextAlign: 'center',
    rowTransition: 'all 0.5s ease',

    cellFontSize: '12px',
    cellFontColor: '#4a4a4a',
    cellBgColor: undefined,

};

export interface ThemeProps {

    headingFontColor?: string;
    headingBgColor?: string;
    headingFontFamily?: string;
    headingFontSize?: string;
    headingCursor?: string;
    headingPadding?: string;
    headingTextTransform?: string;
    headingBorder?: string;

    rowSeparatorColor?: string;
    rowHoverColor?: string;
    rowBgColor?: string;
    rowAltBgColor?: string;
    rowTextAlign?: string;
    rowPadding?: string;
    rowTransition?: string;

    cellFontSize?: string;
    cellFontColor?: string;
    cellBgColor?: string;
}

export interface Style {
    className?: any;
}

export interface Sortable<T> {
    sort?: ColumnSort<T[]>;
}

export enum SortOrder {
    ASC, DESC, NONE
}
