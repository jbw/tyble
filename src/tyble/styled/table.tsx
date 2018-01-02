import styled, { StyledComponentClass } from 'styled-components';

import Table, { TableProps } from '../presentation/table';

const TableStyled: StyledComponentClass<TableProps, React.StatelessComponent<TableProps>>  = styled(Table)`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;

  caption {
      padding: ${ props => props.theme.captionPadding };
      color: ${ props => props.theme.captionFontColor };
      background: ${ props => props.theme.captionBgColor};
  }
`;

export default TableStyled;
