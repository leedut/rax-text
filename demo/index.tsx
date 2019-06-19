import { createElement, render } from 'rax';
import * as DriverDOM from 'driver-dom';
import * as DriverWeex from 'driver-weex';
import { isWeex } from 'universal-env';
import Text from '../src/index';

render(<Text onPress={() => {
  alert('Hello World');
}}>Hello World</Text>, document.body, { driver:isWeex ? DriverWeex : DriverDOM });
