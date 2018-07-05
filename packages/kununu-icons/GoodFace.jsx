import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className, ariaHidden}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
    aria-hidden={ariaHidden}
  >
    <path d="M391.573964,213.585799 C398.390533,206.769231 402.177515,198.43787 402.177515,188.591716 C402.177515,178.745562 398.390533,170.414201 391.573964,162.840237 C384.757396,156.023669 376.426036,152.994083 366.579882,152.994083 C356.733728,152.994083 348.402367,156.023669 341.585799,162.840237 C334.769231,169.656805 330.982249,178.745562 330.982249,188.591716 C330.982249,198.43787 334.011834,206.769231 341.585799,213.585799 C348.402367,220.402367 356.733728,224.189349 366.579882,224.189349 C376.426036,224.189349 384.757396,221.159763 391.573964,213.585799 L391.573964,213.585799 L391.573964,213.585799 Z M182.532544,189.349112 C182.532544,179.502959 178.745562,171.171598 171.928994,163.597633 C165.112426,156.781065 156.781065,153.751479 146.934911,153.751479 C137.088757,153.751479 128.757396,156.781065 121.940828,163.597633 C115.12426,170.414201 111.337278,179.502959 111.337278,189.349112 C111.337278,199.195266 114.366864,207.526627 121.940828,214.343195 C128.757396,221.159763 137.088757,224.946746 146.934911,224.946746 C156.781065,224.946746 165.112426,221.159763 171.928994,214.343195 C178.745562,207.526627 182.532544,199.195266 182.532544,189.349112 L182.532544,189.349112 L182.532544,189.349112 Z M137.088757,288.568047 C133.301775,285.538462 129.514793,284.023669 124.970414,284.023669 C120.426036,284.781065 116.639053,286.295858 113.609467,290.08284 C110.579882,293.869822 109.065089,297.656805 109.065089,302.95858 C109.822485,307.502959 111.337278,311.289941 115.12426,315.076923 C209.798817,397.633136 304.473373,397.633136 399.147929,315.076923 C402.177515,312.047337 404.449704,308.260355 405.207101,302.95858 C405.207101,298.414201 403.692308,293.869822 401.420118,290.08284 C398.390533,287.053254 394.60355,284.781065 389.301775,284.023669 C384.757396,284.023669 380.213018,285.538462 377.183432,288.568047 C296.142012,357.491124 216.615385,357.491124 137.088757,288.568047 L137.088757,288.568047 L137.088757,288.568047 Z M480.189349,135.573964 L480.189349,377.183432 C480.189349,446.106509 446.106509,480.189349 377.183432,480.189349 L135.573964,480.189349 C66.6508876,480.189349 32.5680473,446.106509 32.5680473,377.183432 L32.5680473,135.573964 C32.5680473,66.6508876 66.6508876,31.8106509 135.573964,31.8106509 L377.183432,31.8106509 C445.349112,31.8106509 480.189349,66.6508876 480.189349,135.573964 L480.189349,135.573964 L480.189349,135.573964 Z M511.242604,377.183432 L511.242604,135.573964 C511.242604,45.443787 466.556213,0 376.426036,0 L134.816568,0 C44.6863905,0 2.27373675e-13,44.6863905 2.27373675e-13,135.573964 L2.27373675e-13,377.183432 C2.27373675e-13,466.556213 44.6863905,512 134.816568,512 L376.426036,512 C466.556213,511.242604 511.242604,466.556213 511.242604,377.183432 L511.242604,377.183432 L511.242604,377.183432 Z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
  ariaHidden: PropTypes.bool,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
