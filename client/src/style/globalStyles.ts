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

        @media only screen and (min-width: ${stylesConfig.bpExtraLarge}) {
		font-size: 80%;
	}

        @media only screen and (max-width: ${stylesConfig.bpLarge}) {
            font-size: 52%;
        }

        @media only screen and (max-width: ${stylesConfig.bpSmall}) {
		    font-size: 45%;
	    }

        @media only screen and (max-width: ${stylesConfig.bpExtraSmall}) {
		    font-size: 40%;
	    }

    }

    body {
        font-size: 1.6rem;
        font-family: 'Roboto', sans-serif;
        padding: 2rem;
        color: ${stylesConfig.colorBlack};
    }

    h1, h2, h3 {
        color: ${stylesConfig.colorPrimary};
    }

    p {
        line-height: 1.5;
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
        transition: background-color 0.2s;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }

        
        &--primary {
            background-color: ${stylesConfig.colorPrimary};
            
            &:hover {
                background-color: ${stylesConfig.colorPrimaryLight1};
            }

            &:disabled {
                cursor: not-allowed;
                background-color: ${stylesConfig.colorGrey2};
            }
        }

        &--secondary {
            background-color: ${stylesConfig.colorSecondary};

            &:hover {
                background-color: ${stylesConfig.colorSecondaryLight1};
            }
        }

    }

    /* Animations */

    @keyframes rotateSpinner {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
    }


`;

export default GlobalStyles;
