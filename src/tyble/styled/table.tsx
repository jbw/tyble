import styled, { StyledComponentClass } from 'styled-components';

import Table from '../presentation/table';

const TableStyled: StyledComponentClass<any, any> = styled(Table)`
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
`;

export default TableStyled;
