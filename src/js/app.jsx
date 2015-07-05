var React = require('react'),
	HomePage = require('./pages/HomePage.jsx'),
	RecipePage = require('./pages/RecipePage.jsx'),
	Router = require('react-router');

var {
	Route,
	DefaultRoute,
	NotFoundRoute,
	RouteHandler,
	Link
	} = Router;


var App = React.createClass({
	render: function () {
		return (
			<div>
				<HomePage/>
			</div>
		);
	}
});


//TODO still have to fix about test route - Router.HistoryLocation
// var routes = (
// 	<Route name="app" handler={App} path="/">
// 		<DefaultRoute name="home" handler={ HomePage }/>
// 	</Route>
// );


// Router.run(routes, function (Handler) {
// 	React.render(<Handler/>, document.getElementById('content'));
// });


window.onload = function() {
	React.render(<App />, document.getElementById('content'));
}
