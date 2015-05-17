var React = require('react'),
	Component = require('./components/Component.jsx');

window.onload = function() {
	React.render(<Component />, document.getElementById('content'));
}
