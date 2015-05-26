var React = require('react'),
    AddIngredientInput = require('../components/AddIngredientInput.jsx'),
    RecipeSearch  = require('../components/RecipeSearch.jsx');

var HomePage = React.createClass({
  render: function() {
    return (
      <div className="container">
      	<div className="row">
        		<div className="col-md-12 text-center">

              <div className="overlay"></div>
              <video autoPlay loop poster="static/img/background.jpg" id="bgvideo">
                <source src="static/img/bartender.mp4" type="video/mp4"></source>
              </video>

              <img className="top-buffer-60" src="static/img/logo-glyph.png" width="120" />
              <h1 className="landing">
                Welcome to<br />
                <strong>Cocktail Wizard!</strong>
              </h1>
              <div className="top-buffer-40 landing-autocomplete">
                <AddIngredientInput placeholder="add an ingredient..." />
                <RecipeSearch recipesList={allRecipes} />
              </div>
            </div>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
