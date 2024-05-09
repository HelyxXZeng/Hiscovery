import heart from "../assets/icons/heart.png";
import menu from "../assets/icons/menu.png";
import search from "../assets/icons/search.png";
import filter from "../assets/icons/filter.png";
import left from "../assets/icons/left.png";
import heartOutline from "../assets/icons/heart-ol.png";
import share from "../assets/icons/share.png";
import location from "../assets/icons/location.png";
import chevronLeft from "../assets/icons/chevron-left.png";
import chevronRight from "../assets/icons/chevron-right.png";

import { SvgXml } from "react-native-svg";

const widgets = ({ fill }) => {
  const svgXml = `
    <svg width="28" height="27" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_228_597" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="30">
    <rect x="0.5" width="30" height="30" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_228_597)">
    <path d="M21.0961 15.6009L14.9231 9.42791L21.0961 3.25488L27.2692 9.42791L21.0961 15.6009ZM5.2597 13.5096V4.7597H14.0096V13.5096H5.2597ZM16.9904 25.2403V16.4904H25.7403V25.2403H16.9904ZM5.2597 25.2403V16.4904H14.0096V25.2403H5.2597Z" fill="${fill}"/>
    </g>
    </svg>
  `;

  return <SvgXml xml={svgXml} />;
};

const moreHoriz = ({ fill }) => {
  const svgXml = `
    <svg width="29" height="27" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_87_326" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
    <rect width="30" height="30" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_87_326)">
    <path d="M7.5 17.5C6.8125 17.5 6.22396 17.2552 5.73438 16.7656C5.24479 16.276 5 15.6875 5 15C5 14.3125 5.24479 13.724 5.73438 13.2344C6.22396 12.7448 6.8125 12.5 7.5 12.5C8.1875 12.5 8.77604 12.7448 9.26562 13.2344C9.75521 13.724 10 14.3125 10 15C10 15.6875 9.75521 16.276 9.26562 16.7656C8.77604 17.2552 8.1875 17.5 7.5 17.5ZM15 17.5C14.3125 17.5 13.724 17.2552 13.2344 16.7656C12.7448 16.276 12.5 15.6875 12.5 15C12.5 14.3125 12.7448 13.724 13.2344 13.2344C13.724 12.7448 14.3125 12.5 15 12.5C15.6875 12.5 16.276 12.7448 16.7656 13.2344C17.2552 13.724 17.5 14.3125 17.5 15C17.5 15.6875 17.2552 16.276 16.7656 16.7656C16.276 17.2552 15.6875 17.5 15 17.5ZM22.5 17.5C21.8125 17.5 21.224 17.2552 20.7344 16.7656C20.2448 16.276 20 15.6875 20 15C20 14.3125 20.2448 13.724 20.7344 13.2344C21.224 12.7448 21.8125 12.5 22.5 12.5C23.1875 12.5 23.776 12.7448 24.2656 13.2344C24.7552 13.724 25 14.3125 25 15C25 15.6875 24.7552 16.276 24.2656 16.7656C23.776 17.2552 23.1875 17.5 22.5 17.5Z" fill="${fill}"/>
    </g>
    </svg>
  `;

  return <SvgXml xml={svgXml} />;
};

const following = ({ fill }) => {
  const svgXml = `
  <svg width="28" height="27" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_229_705" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
  <rect width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_229_705)">
  <path d="M5.38469 25.6249C4.75327 25.6249 4.21881 25.4062 3.78131 24.9687C3.34381 24.5312 3.12506 23.9967 3.12506 23.3653V9.375H5.00003V23.3653C5.00003 23.4615 5.04009 23.5496 5.12022 23.6298C5.20036 23.7099 5.28852 23.75 5.38469 23.75H23.125V25.6249H5.38469ZM10.3847 20.6249C9.75327 20.6249 9.21881 20.4062 8.78131 19.9687C8.34381 19.5312 8.12506 18.9967 8.12506 18.3653V4.375H28.125V18.3653C28.125 18.9967 27.9063 19.5312 27.4688 19.9687C27.0313 20.4062 26.4968 20.6249 25.8654 20.6249H10.3847ZM12.5 15H17.5V8.74997H12.5V15ZM18.75 15H23.75V12.5H18.75V15ZM18.75 11.25H23.75V8.74997H18.75V11.25Z" fill="${fill}"/>
  </g>
  </svg>  
  `;

  return <SvgXml xml={svgXml} />;
};

const house = ({ fill }) => {
  const svgXml = `
  <svg width="28" height="27" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_232_737" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="30">
  <rect x="0.5" width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_232_737)">
  <path d="M5.5 26.25V11.25L15.5 3.75L25.5 11.25V26.25H18V17.5H13V26.25H5.5Z" fill="${fill}"/>
  </g>
  </svg>

  `;

  return <SvgXml xml={svgXml} />;
};

const watchLater = ({ fill }) => {
  const svgXml = `
  <svg width="28" height="27" viewBox="0 0 31 30" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_228_621" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="30">
  <rect x="0.5" width="30" height="30" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_228_621)">
  <path d="M19.8414 20.6586L21.1587 19.3413L16.4375 14.6199V8.74997H14.5626V15.3798L19.8414 20.6586ZM15.5021 26.8749C13.8597 26.8749 12.3159 26.5633 10.8707 25.9399C9.42556 25.3166 8.16846 24.4707 7.09944 23.4021C6.03039 22.3336 5.18407 21.077 4.56047 19.6325C3.93686 18.1879 3.62506 16.6445 3.62506 15.0021C3.62506 13.3596 3.93673 11.8159 4.56006 10.3707C5.18339 8.9255 6.02933 7.6684 7.09787 6.59938C8.16644 5.53034 9.42299 4.68401 10.8675 4.06041C12.3121 3.4368 13.8555 3.125 15.4979 3.125C17.1404 3.125 18.6841 3.43667 20.1293 4.06C21.5745 4.68333 22.8316 5.52927 23.9006 6.59781C24.9697 7.66638 25.816 8.92293 26.4396 10.3675C27.0632 11.812 27.375 13.3555 27.375 14.9979C27.375 16.6403 27.0633 18.1841 26.44 19.6293C25.8167 21.0744 24.9707 22.3315 23.9022 23.4006C22.8336 24.4696 21.5771 25.3159 20.1325 25.9395C18.688 26.5631 17.1445 26.8749 15.5021 26.8749Z" fill="${fill}"/>
  </g>
  </svg>
    `;

  return <SvgXml xml={svgXml} />;
};

const category = ({ fill }) => {
  const svgXml = `
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_249_550" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
  <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_249_550)">
  <path d="M3.29999 19.2V17.7H4.79999V19.2H3.29999ZM7.79999 19.2V17.7H20.7V19.2H7.79999ZM3.29999 13.25V11.75H4.79999V13.25H3.29999ZM7.79999 13.25V11.75H20.7V13.25H7.79999ZM3.29999 7.29999V5.79999H4.79999V7.29999H3.29999ZM7.79999 7.29999V5.79999H20.7V7.29999H7.79999Z" fill="${fill}"/>
  </g>
  </svg>
    `;

  return <SvgXml xml={svgXml} />;
};

const notification = ({ fill }) => {
  const svgXml = `
  <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_249_568" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="26" height="27">
  <rect y="0.5" width="26" height="26" fill="#D9D9D9"/>
  </mask>
  <g mask="url(#mask0_249_568)">
  <path d="M4.875 20.9583V19.3334H6.83334V11.25C6.83334 9.79307 7.28299 8.50488 8.18228 7.38544C9.08159 6.26599 10.2361 5.55003 11.6458 5.23754V4.56254C11.6458 4.18639 11.7774 3.86666 12.0404 3.60336C12.3035 3.34004 12.6229 3.20837 12.9988 3.20837C13.3746 3.20837 13.6944 3.34004 13.9583 3.60336C14.2222 3.86666 14.3541 4.18639 14.3541 4.56254V5.23754C15.7638 5.55003 16.9184 6.26599 17.8177 7.38544C18.717 8.50488 19.1666 9.79307 19.1666 11.25V19.3334H21.1249V20.9583H4.875ZM12.9981 24C12.4591 24 11.9982 23.8082 11.6156 23.4247C11.233 23.0412 11.0417 22.5802 11.0417 22.0417H14.9583C14.9583 22.5819 14.7664 23.0434 14.3825 23.426C13.9986 23.8087 13.5372 24 12.9981 24ZM8.45829 19.3334H17.5417V11.25C17.5417 9.99584 17.0982 8.92535 16.2114 8.03855C15.3246 7.15174 14.2541 6.70833 13 6.70833C11.7458 6.70833 10.6753 7.15174 9.78851 8.03855C8.9017 8.92535 8.45829 9.99584 8.45829 11.25V19.3334Z" fill="${fill}"/>
  </g>
  </svg>

    `;

  return <SvgXml xml={svgXml} />;
};

const arrowRight = ({ fill }) => {
  const svgXml = `
  <svg width="33" height="30" viewBox="0 0 40 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_264_517" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="37">
<rect width="40" height="37" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_264_517)">
<path d="M23.0769 27.2163L21.3205 25.5442L27.6859 19.6562H7.5V17.3438H27.6859L21.3205 11.4558L23.0769 9.78366L32.4999 18.5L23.0769 27.2163Z" fill="${fill}"/>
</g>
</svg>


    `;

  return <SvgXml xml={svgXml} />;
};

export default {
  heart,
  menu,
  search,
  filter,
  left,
  heartOutline,
  share,
  location,
  chevronLeft,
  chevronRight,
  widgets,
  moreHoriz,
  following,
  house,
  watchLater,
  category,
  notification,
  arrowRight,
};
