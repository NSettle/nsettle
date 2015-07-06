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

    componentWillReceiveProps: function (nextProps) {
      if(nextProps.recipeHash)
        this._getRecipe(nextProps.recipeHash.split('-')[1])
    },

  	componentDidMount:function(){
      if(this.props.recipeHash)
  		  this._getRecipe(this.props.recipeHash.split('-')[1])
  	},

    _backToHome:function () {
      if(global)
      {
        var loc = global.location.href,
        index = loc.indexOf('#');

        if (index > 0) {
          global.location = loc.substring(0, index)+"#/";
        }
      }  
    },

    render: function () {
      var recipe = null;
      if(this.props.recipeHash) {
        recipe = <div className="content card">
                <div className="card-content">
                  <h2>Recipe page</h2>
                  <button onClick={this._backToHome}>back</button> 
                  {this.state.recipe?
                  <ul>
                    <li>{'name: '+this.state.recipe.name}</li>
                    <li>{'id: '+this.state.recipe.id}</li>
                    <li>{'ingredients: ['+this.state.recipe.ingredients+']'}</li>
                  </ul>
                  :null}
                </div>
              </div>;
      }

      return (
          <div className={ this.props.recipeHash ? "recipePage opened" : "recipePage"}>
            { recipe }
          </div>);
        
         
    }

});

module.exports = RecipePage;