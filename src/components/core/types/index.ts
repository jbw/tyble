
export type MouseEvent = React.MouseEvent<HTMLDivElement>;
export type MouseClickFunc = (e: MouseEvent) => void;
export type CellRender<T> = (props: T) => JSX.Element;
export type ColumnSort<T> = (props: T, sortOrder: SortOrder) => T;

export interface Style {
    className?: any;
}

export interface Sortable<T> {
    sort: ColumnSort<T[]>;
}

export enum SortOrder {
    ASC, DESC, NONE,
}
