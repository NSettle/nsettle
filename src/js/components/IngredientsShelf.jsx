var React = require('react'),
	R = require('ramda'),
	Utils = require('../support/utils.jsx');

var IngredientsShelf = React.createClass({
	getInitialState: function() {
		return {
			ingredients: new Array()
		};
	},

	componentDidMount:function(){
		document.addEventListener('ingredientsChanged', this._updateIngredients);
	},

	_removeIngredient:function  (id) {
		var newIngredients = R.clone(this.state.ingredients).filter(function(i) {
            return i.id != id;
        });

        this.setState({ ingredients: newIngredients });
        Utils.dispatch("ingredientsChanged", {"ingredients": newIngredients});
	},

	_updateIngredients:function  (e, data) {
		console.log('_updateIngredients IngredientsShelf', e.detail.ingredients, data)
		if(e.detail.ingredients)
		{
			this.setState({
	          ingredients: e.detail.ingredients
	        })
		}	
        
    },

	render: function() {

		var self = this;

		console.log('IngredientsShelf state',this.state)

		if(this.state.ingredients && this.state.ingredients.length>0)
		{
			var tags = this.state.ingredients.map(function(ingredient,idx) {
				return <IngredientItem key={'IngredientItem-'+idx} ingredient={ ingredient } removeIngredient={self._removeIngredient} />
			});

			return <div>
				<ul className="tags">
					{ tags }
				</ul>
			</div>
		}else{
			return null
		}	
	}

});

//onClick={ this.props.onAction.bind(null, this.props.ingredient.id) }

var IngredientItem = React.createClass({
	render: function() {
		return <li>
				<div className="tag">
					{ this.props.ingredient.name }
					<a href="javascript:void(0)" onClick={ this.props.removeIngredient.bind(null, this.props.ingredient.id) }>x</a>
				</div>
			</li>
	}
});

module.exports = IngredientsShelf;
