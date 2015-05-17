var React = require('react');

var IngredientsShelf = React.createClass({
	getInitialState: function() {
		return {
			ingredients: []
		};
	},
	componentWillReceiveProps: function(props) {
		this.setState({ ingredients: props.ingredients });
	},

	render: function() {

		var self = this;
		var tags = this.state.ingredients.map(function(ingredient,idx) {
			return <IngredientItem key={'IngredientItem-'+idx} ingredient={ ingredient } onAction={ self.props.onAction } />
		});

		return <div>
			<ul>
				{ tags }
			</ul>
		</div>
	}

});

var IngredientItem = React.createClass({
	render: function() {
		return <li><div className="tag">{ this.props.ingredient.name }<a href="javascript:void(0)" className="pull-right" onClick={ this.props.onAction.bind(null, this.props.ingredient.id) }>x</a></div></li>
	}
});

module.exports = IngredientsShelf;
