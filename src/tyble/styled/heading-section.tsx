import styled, { StyledComponentClass } from 'styled-components';

import HeadingSection, { HeadingSectionProps } from '../presentation/heading-section';

export type HeadingWrapperStyledClass<P> = StyledComponentClass<P, React.StatelessComponent<P>>;

const HeadingWrapperStyled: HeadingWrapperStyledClass<HeadingSectionProps> = styled(HeadingSection) `
  display: flex;
  font-family: ${ props => props.theme.headingFontFamily};
  cursor: ${ props => props.theme.headingCursor};
  padding: ${ props => props.theme.headingPadding};
  background: ${ props => props.theme.headingBgColor};
  font-size: ${ props => props.theme.headingFontSize};
  color: ${ props => props.theme.headingFontColor};
  text-transform: ${ props => props.theme.textTransform};
  border-top: ${ props => props.theme.headingBorder};
`;

export default HeadingWrapperStyled;
