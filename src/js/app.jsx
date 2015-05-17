var React = require('react'),
	HomePage = require('./pages/HomePage.jsx');

window.onload = function() {
	React.render(<HomePage />, document.getElementById('content'));
}
