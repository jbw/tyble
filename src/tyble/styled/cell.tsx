import styled, { StyledComponentClass } from 'styled-components';

import Cell, { CellProps } from '../presentation/cell';

const CellStyled: StyledComponentClass<CellProps, React.StatelessComponent<CellProps>> = styled(Cell) `
  display: flex;
  flex-grow: 1;
  flex-basis: 0;
  white-space: nowrap;
  min-width: 0;
  font-weight: lighter;
  font-size: ${ props => props.theme.cellFontSize };
  background: ${ props => props.theme.cellBgColor };
  color: ${ props => props.theme.cellFontColor };

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export default CellStyled;
