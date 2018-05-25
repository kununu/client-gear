// Temporary hack to suppress error
// https://github.com/facebook/jest/issues/4545
import shim from './shim';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({adapter: new Adapter()});
