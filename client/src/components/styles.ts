import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledNavbarLink = styled(Link)`
    text-decoration: underline;
    color: darkgreen;
    margin: 10px;
    font-size: 20px;
    font-family: 'Roboto', sans-serif;

    &:hover {
        cursor: pointer;
    }
`

export const StyledInput = styled.input`
    width: 250px;
    outline: 0;
    margin: 10px 0;
`