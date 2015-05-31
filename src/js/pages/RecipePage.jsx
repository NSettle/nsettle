var React = require('react')

var RecipePage = React.createClass({

	contextTypes: {
    	router: React.PropTypes.func
  	},

  	_getRecipe:function(recipeId){
  		var self = this
  		allRecipes.forEach(function(recipe){
  			if(recipe.id==recipeId)
  			{
  				self.setState({
		  			recipe:recipe
		  		})
  			}	
  		})
  	},

  	getInitialState:function(){
  		return {
  			recipe:null
  		}
  	},

  	componentDidMount:function(){
  		var recipeId = this.context.router.getCurrentParams().recipeId;
  		this._getRecipe(recipeId.split('-')[1])
  	},

    render: function () {
    	console.log(this.state)
         return (
            <div style={{color:'red'}}>
            	<h2>Recipe page</h2>
            	{this.state.recipe?
            	<ul>
            		<li>{'name: '+this.state.recipe.name}</li>
            		<li>{'id: '+this.state.recipe.id}</li>
            		<li>{'ingredients: ['+this.state.recipe.ingredients+']'}</li>
            	</ul>
            	:null}
            </div>
        )
    }

});

module.exports = RecipePage;