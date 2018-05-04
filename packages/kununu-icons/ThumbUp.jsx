import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
  >
    <path d="M103.692631,206.00301 C109.297108,202.647796 114.901586,200.398533 121.059038,198.149269 C188.865741,167.324644 188.312766,61.3925496 188.312766,55.7880723 C188.312766,54.6821221 187.759791,53.5388087 187.759791,52.4328585 C187.759791,26.6597354 207.375462,3.09851272 233.148585,0.296274051 C258.921708,-2.50596462 283.035906,14.8604425 288.087408,40.0805905 C291.442622,54.0917838 291.442622,125.844039 260.065021,192.507429 L261.731419,192.507429 C255.020992,201.49701 250.522465,212.15299 250.522465,223.361945 C250.522465,236.820163 256.126942,249.135068 264.533658,258.094759 C241.562774,261.464918 225.855292,281.080589 225.855292,308.535055 C225.855292,326.46191 235.367958,342.161919 249.379151,351.136555 C235.920933,360.088774 226.961242,375.788783 226.961242,393.170135 C226.961242,421.192522 249.932126,444.155934 277.954513,444.155934 C270.100772,453.115625 264.496295,464.870082 264.496295,477.782798 C264.496295,490.680568 269.547797,502.457443 277.954513,511.962637 L155.24635,511.962637 C97.5052881,511.962637 51.0105442,465.438002 51.0105442,407.726831 L51.0105442,296.750707 C50.4500964,258.109704 72.2851401,223.929865 103.692631,206.00301 L103.692631,206.00301 Z M315.526929,444.193297 L369.875414,444.193297 C388.385134,444.193297 403.502278,459.31044 403.502278,477.820161 C403.502278,496.322409 388.385134,512 369.875414,512 L314.936591,512 C296.42687,512 281.309727,496.890329 281.309727,477.820161 C281.34709,459.317913 296.464234,444.193297 315.526929,444.193297 L315.526929,444.193297 Z M315.526929,427.379865 L277.991876,427.379865 C259.482156,427.379865 244.365012,412.255249 244.365012,393.753001 C244.365012,375.24328 259.482156,360.126137 277.991876,360.126137 L427.616476,360.126137 C446.126196,360.126137 461.796315,375.24328 461.796315,393.753001 C461.796315,412.255249 446.679171,427.379865 427.616476,427.379865 L315.526929,427.379865 L315.526929,427.379865 Z M426.510526,342.169391 L276.325478,342.169391 C257.815758,342.169391 242.698614,327.059721 242.698614,308.542527 C242.698614,290.04028 252.801619,274.370161 271.826951,274.370161 L426.503053,274.370161 C445.012773,274.370161 460.682892,289.494777 460.682892,308.542527 C460.690365,327.059721 445.565749,342.169391 426.510526,342.169391 L426.510526,342.169391 Z M301.515736,257.556729 C283.006015,257.556729 267.888872,242.439585 267.888872,223.37689 C267.888872,204.867169 283.006015,189.750026 301.515736,189.750026 L387.832159,189.750026 C406.34188,189.750026 421.459023,204.867169 421.459023,223.37689 C421.459023,242.439585 406.34188,257.556729 387.832159,257.556729 L301.515736,257.556729 L301.515736,257.556729 Z" />
  </svg>
);

Icon.propTypes = {
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: '',
};

export default Icon;
