import styled, { StyledComponentClass } from 'styled-components';

import Row, { RowProps } from '../presentation/row';

const RowStyled: StyledComponentClass<RowProps, React.StatelessComponent<RowProps>> = styled(Row) `
  display: flex;
  border-top: ${ props => props.theme.rowSeparatorColor };
  text-align: ${ props => props.theme.rowTextAlign };
  padding: ${ props => props.theme.rowPadding };
  transition: ${ props => props.theme.rowTransition };
  background: ${ props => props.theme.rowBgColor};

  &:hover {
    background: ${ props => props.theme.rowHoverColor };
  }
`;

export default RowStyled;
