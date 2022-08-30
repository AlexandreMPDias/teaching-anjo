import { Global } from '@emotion/react';

export const FontsLoader = () => (
	<Global
		styles={`
            @font-face {
              font-family: avenirRegular;
              src: url('/fonts/avenir/AvenirNext-Regular.eot');
              src: local('avenirRegular'), local('AvenirNext-Regular'),
                  url('/fonts/avenir/AvenirNext-Regular.eot?#iefix') format('embedded-opentype'),
                  url('/fonts/avenir/AvenirNext-Regular.woff2') format('woff2'),
                  url('/fonts/avenir/AvenirNext-Regular.woff') format('woff'),
                  url('/fonts/avenir/AvenirNext-Regular.ttf') format('truetype'),
                  url('/fonts/avenir/AvenirNext-Regular.svg#AvenirNext-Regular') format('svg');
              font-weight: normal;
              font-style: normal;
          }
          
          @font-face {
              font-family: avenirHeavy;
              src: url('/fonts/avenir/AvenirNext-Heavy.eot');
              src: local('avenirHeavy'), local('AvenirNext-Heavy'),
                  url('/fonts/avenir/AvenirNext-Heavy.eot?#iefix') format('embedded-opentype'),
                  url('/fonts/avenir/AvenirNext-Heavy.woff2') format('woff2'),
                  url('/fonts/avenir/AvenirNext-Heavy.woff') format('woff'),
                  url('/fonts/avenir/AvenirNext-Heavy.ttf') format('truetype'),
                  url('/fonts/avenir/AvenirNext-Heavy.svg#AvenirNext-Heavy') format('svg');
              font-weight: 900;
              font-style: normal;
          }
          
          @font-face {
              font-family: avenirUltraLight;
              src: url('/fonts/avenir/AvenirNext-UltraLight.eot');
              src: local('avenirUltraLight'),
                  url('/fonts/avenir/AvenirNext-UltraLight.eot?#iefix') format('embedded-opentype'),
                  url('/fonts/avenir/AvenirNext-UltraLight.woff2') format('woff2'),
                  url('/fonts/avenir/AvenirNext-UltraLight.woff') format('woff'),
                  url('/fonts/avenir/AvenirNext-UltraLight.ttf') format('truetype'),
                  url('/fonts/avenir/AvenirNext-UltraLight.svg#AvenirNext-UltraLight') format('svg');
              font-weight: 200;
              font-style: normal;
          }
          
          @font-face {
              font-family: avenirMedium;
              src: url('/fonts/avenir/AvenirNext-Medium.eot');
              src: local('avenirMedium'), local('AvenirNext-Medium'),
                  url('/fonts/avenir/AvenirNext-Medium.eot?#iefix') format('embedded-opentype'),
                  url('/fonts/avenir/AvenirNext-Medium.woff2') format('woff2'),
                  url('/fonts/avenir/AvenirNext-Medium.woff') format('woff'),
                  url('/fonts/avenir/AvenirNext-Medium.ttf') format('truetype'),
                  url('/fonts/avenir/AvenirNext-Medium.svg#AvenirNext-Medium') format('svg');
              font-weight: 500;
              font-style: normal;
          }
          
          @font-face {
              font-family: avenirBold;
              src: url('/fonts/avenir/AvenirNext-Bold.eot');
              src: local('avenirBold'), local('AvenirNext-Bold'),
                  url('/fonts/avenir/AvenirNext-Bold.eot?#iefix') format('embedded-opentype'),
                  url('/fonts/avenir/AvenirNext-Bold.woff2') format('woff2'),
                  url('/fonts/avenir/AvenirNext-Bold.woff') format('woff'),
                  url('/fonts/avenir/AvenirNext-Bold.ttf') format('truetype'),
                  url('/fonts/avenir/AvenirNext-Bold.svg#AvenirNext-Bold') format('svg');
              font-weight: bold;
              font-style: normal;
          }
          
          @font-face {
              font-family: avenirDemiBold;
              src: url('/fonts/avenir/AvenirNext-DemiBold.eot');
              src: local('avenirDemiBold'), local('AvenirNext-DemiBold'),
                  url('/fonts/avenir/AvenirNext-DemiBold.eot?#iefix') format('embedded-opentype'),
                  url('/fonts/avenir/AvenirNext-DemiBold.woff2') format('woff2'),
                  url('/fonts/avenir/AvenirNext-DemiBold.woff') format('woff'),
                  url('/fonts/avenir/AvenirNext-DemiBold.ttf') format('truetype'),
                  url('/fonts/avenir/AvenirNext-DemiBold.svg#AvenirNext-DemiBold') format('svg');
              font-weight: 600;
              font-style: normal;
          }

          /*
          This will hide the focus indicator if the element receives focus    via the mouse,
          but it will still show up on keyboard focus.
          */
          .js-focus-visible :focus:not([data-focus-visible-added]) {
            outline: none;
            box-shadow: none;
          }

          .rpv-core__page-layer {
            margin: 0 auto;
          }

          .rpv-core__inner-page {
            background-color: white;
            border-radius: 10px;
          }
      `}
	/>
);
