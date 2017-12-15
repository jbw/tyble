import styled, { StyledComponentClass } from 'styled-components';

import Row, { RowProps } from '../presentation/row';

type StyledRowProps = RowProps & styled.theme;

const RowStyled: StyledComponentClass<RowProps, React.StatelessComponent<RowProps>> = styled(Row) `
  display: flex;
  border-top: ${ (props: StyledRowProps) => props.theme.rowSeparatorColor };
  text-align: ${ (props: StyledRowProps)  => props.theme.rowTextAlign };
  padding: ${ (props: StyledRowProps)  => props.theme.rowPadding };
  transition: ${ (props: StyledRowProps)  => props.theme.rowTransition };
  background: ${ (props: StyledRowProps)  => props.theme.rowBgColor};

  &:hover {
    background: ${ props => props.theme.rowHoverColor };
  }
`;

export default RowStyled;
