import styled, { StyledComponentClass } from 'styled-components';

import Heading, { HeadingProps } from '../presentation/heading';

const getIconSymbol = (props: HeadingProps): string => {
    return props.showDescSortingIcon !== undefined ? (props.showDescSortingIcon ? '\\2193' : '\\2191') : '';
};

const HeadingStyled: StyledComponentClass<HeadingProps, React.StatelessComponent<HeadingProps>> = styled(Heading) `
  display: flex;
  width: 100%;

  &::before {
    padding-right: ${ props => props.showDescSortingIcon !== undefined ? '6px' : '0px'};
    content: '${getIconSymbol}';
  }
`;

export default HeadingStyled;
