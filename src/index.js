'use strict';

// CSS styles
require('style-loader!css-loader!normalize.css/normalize.css');
require('style-loader!css-loader!codemirror/lib/codemirror.css');
require('styles/main.scss');

var React = require('react');
var App = require('react_components/app');

var injectTapEventPlugin = require('react-tap-event-plugin');
//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

React.render(<App />, window.document.body);
