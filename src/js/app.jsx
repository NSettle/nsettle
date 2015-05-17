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
			<div className="App">
				<RouteHandler/>
			</div>
		);
	}
});

var routes = (
	<Route handler={App} path="/">
		<DefaultRoute handler={HomePage}/>
		<Route name="recipe" path="/about" handler={RecipePage}/>
	</Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.getElementById('content'));
});


//window.onload = function() {
//	React.render(<App />, document.getElementById('content'));
//}
