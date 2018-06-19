// Temporary hack to suppress error
// https://github.com/facebook/jest/issues/4545

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import shim from './shim';

Enzyme.configure({adapter: new Adapter()});
