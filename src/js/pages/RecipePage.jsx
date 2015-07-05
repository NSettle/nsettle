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
        this._getRecipe(nextProps.recipeHash.split('#/')[1].split('-')[1])
    },

  	componentDidMount:function(){
      if(this.props.recipeHash)
  		  this._getRecipe(this.props.recipeHash.split('#/')[1].split('-')[1])
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
    	console.log('recipePage',this.state)
      if(this.props.recipeHash)
      {
        return (
            <div className="recipePage" style={{color:'red'}}>
              <h2>Recipe page</h2>
              <button onClick={this._backToHome}>back</button> 
              <a href="#/3333">test change hash</a>
              {this.state.recipe?
              <ul>
                <li>{'name: '+this.state.recipe.name}</li>
                <li>{'id: '+this.state.recipe.id}</li>
                <li>{'ingredients: ['+this.state.recipe.ingredients+']'}</li>
              </ul>
              :null}
            </div>
        )
      }else{
        return null;
      }  
         
    }

});

module.exports = RecipePage;