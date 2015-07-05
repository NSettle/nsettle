var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
        R = require('ramda'),
        Utils = require('../support/utils.jsx');

var ingredientsOnShelf;

var RecipeSearch = React.createClass({
  mixins : [ Utils ],

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
    //return only recipes that have at least one ingredient on the ingredient shelf
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
    console.log('recipesList',this.state.recipesList)

      return <div className={ this.props.splitted ? "recipe-list" : "recipe-list before" }>
            <div className="container" style={ this.props.splitted ? {} : { display: "none" }}>
              { this.props.splitted && this.state.recipesList.length > 0?
              <div>
                {this.state.recipesList.map(function(recipe){
                  return (<RecipeCard hasImage={ true } recipe={recipe} />)
                })}
              </div>
              : null }
            </div>
          </div>
  }

});

/* Opcional, mas fica legal do domingo legal! */
var SaveAction = React.createClass({
  getInitialState: function() {
    return { saved: false }
  },
  _save: function() {
    this.setState({ saved: !this.state.saved });
  },
  render: function() {
    return (<i className={ this.state.saved ? "fa fa-heart liked" : "fa fa-heart-o" } onClick={ this._save } style={{ color: "#EB393B", cursor: "pointer" }} />)
  }
});

var RecipeCard = React.createClass({
  render: function() {

    var recipe = this.props.recipe;

    if (this.props.hasImage) {
      return (<div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-image">
                    <img className="responsive-image" src="static/img/cocktail.jpg" alt="Nome do drink" />
                    <h4 className="card-title">
                      {recipe.name}
                      <span className="missing">{recipe.ingredientsMissing+" missing"}</span>
                    </h4>

                  </div>
                  <div className="card-content">
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incindunt ut labore et dolore magna aliqua. Ut enim and minim veniam.'}
                  </div>
                  <div className="card-action">
                    <a key={'recipesListResults-'+recipe.id} href={"/#/"+Utils.getRecipeUrl(recipe)} params={{recipeId:Utils.getRecipeUrl(recipe)}}>READ MORE</a>
                    <SaveAction />
                  </div>
                </div>
              </div>
            </div>);
    }
    else {
      return (<div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-content">
                    <h4 className="card-title">
                      Strawberry and Pineapple Juice
                      <span className="missing">1 missing</span>
                    </h4>
                    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incindunt ut labore et dolore magna aliqua. Ut enim and minim veniam.'}
                  </div>
                  <div className="card-action">
                    <a href="javascript:void(0)">READ MORE</a>
                    <SaveAction />
                  </div>
                </div>
              </div>
            </div>);
    }
  }
});

module.exports = RecipeSearch;
