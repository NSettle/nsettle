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
  				// return recipe.name
  				self.setState({
		  			recipe:recipe
		  		})
  			}	
  		})
  	},

  	getInitialState:function(){
  		var recipeId = this.context.router.getCurrentParams().recipeId;
  		console.log('getInitialState: '+recipeId);

  		return {
  			recipe:null
  		}
  	},

  	componentDidMount:function(){

  		var recipeId = this.context.router.getCurrentParams().recipeId;
  		this._getRecipe(recipeId)
  		// this.setState({
  		// 	recipe:this._getRecipe(recipeId)
  		// })
  	},

  	componentWillReceiveProps:function(nextProps){
  		console.log(nextProps)
  	},

    render: function () {
    	console.log(this.state)
         return (
            <div style={{color:'red'}}>
            	<h2>Recipe page</h2>
            	<h4>{this.state.recipe?this.state.recipe.id:null}</h4>
            </div>
        )
    }

});

module.exports = RecipePage;