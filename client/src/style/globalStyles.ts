import { createGlobalStyle } from 'styled-components';
import stylesConfig from '../utils/stylesConfig';

const GlobalStyles = createGlobalStyle`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 62.5%;
        box-sizing: border-box;
    }

    body {
        font-size: 1.6rem;
        font-family: 'Roboto', sans-serif;
        padding: 2rem;
    }

    main {
       display: flex;
    }

    .btn {
        text-transform: uppercase;
        border-radius: 4px;
        font-family: 'Roboto';
        font-size: 1.6rem;
        color: #eee;
        border: none;
        padding: 1.2rem 1.5rem;
        cursor: pointer;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }

        &--primary {
            background-color: ${stylesConfig.colorPrimary};
        }

        &--secondary {
            background-color: ${stylesConfig.colorSecondary};
        }
    }

    .input--file {
        margin-bottom: 2rem;
    }


`;

export default GlobalStyles;
