var React = require('react'),
        R = require('ramda');

var ingredientsOnShelf;

var RecipeSearch = React.createClass({

  getInitialState:function(){
    return {
      recipesList : []
    }
  },

  _searchRecipe:function(e, data){
    ingredientsOnShelf = e.detail.ingredients;

    this.setState({
      recipesList:R.filter(this._isIngredientOn,this.props.recipesList).sort(this._sortByIngredientsMissing)
    })
  },

  _sortByIngredientsMissing:function(a,b){
    return a.ingredientsMissing - b.ingredientsMissing
  },

  _isIngredientOn:function(recipe){
    var ingredientsMissing = recipe.ingredients.length;
    ingredientsOnShelf.forEach(function(ingredient){
      if(recipe.ingredients.indexOf(ingredient.id)!=-1)
      {
        ingredientsMissing -=1;
      }
    })
    recipe.ingredientsMissing = ingredientsMissing;
    return ingredientsMissing!=recipe.ingredients.length;
  },

  componentDidMount:function(){
    document.addEventListener('ingredientsChanged', this._searchRecipe);
  },

  //recipesList

  render: function () {
      console.log('render',this.state)
      return (
          <div>
            <h2>Recipe search</h2>
            <ul>
            {this.state.recipesList.map(function(recipe){
              return <li>{recipe.name+' ['+recipe.ingredients+'] ingredientsMissing:'+recipe.ingredientsMissing}</li>
            })}
          </ul>
          </div>
      )
  }

});

module.exports = RecipeSearch;
