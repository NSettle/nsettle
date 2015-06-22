var React = require('react'),
    utils = require('../support/utils.jsx'),
    AddIngredientInput = require('../components/AddIngredientInput.jsx'),
    RecipeSearch  = require('../components/RecipeSearch.jsx');

var HomePage = React.createClass({
  getInitialState: function() {
    return { splitted: false, scrollTop: 0 };
  },
  componentWillMount: function() {
    document.addEventListener("splitWindow", this._splitWindow);
    document.addEventListener("scroll", this._setScroll);
  },
  componentWillUnmount: function() {
    document.removeEventListener("splitWindow", this._splitWindow);
    document.removeEventListener("scroll", this._setScroll);
  },
  _setScroll: function(ev) {
    var top = (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);
    this.setState({ scrollTop: top });
  },
  _splitWindow: function() {
    this.setState({ splitted: !this.state.splitted });
  },
  _dispatch: function() {
    utils.dispatch("splitWindow");
  },
  render: function() {
    return (
        <div className="">
        	  {/*}<div className="row">
          		<div className="col-md-12">
              
                <div className="overlay"></div>
                <video autoPlay loop poster="static/img/background.jpg" id="bgvideo">
                  <source src="static/img/bartender.mp4" type="video/mp4"></source>
                </video>
                

                <img className="logo top-buffer-60" src="static/img/logo-glyph.png" />
                <h1 className="landing">
                  Welcome to <a href="#" onClick={ this._dispatch }>the</a><br />
                  <strong>Cocktail Wizard!</strong>
                </h1>
                <div className="top-buffer-40 landing-autocomplete">
                  <AddIngredientInput placeholder="add an ingredient..." />
                </div>

                
              </div>
          </div>*/}
          <header className={ this.state.splitted ? "splitted" : "" }>
            <div className="text-center">
              
              <h1 className="landing" style={{ fontWeight: "bold" }} onClick={ this._splitWindow }>
                {/* <img className="logo" src="static/img/logo-glyph.png" /> */ }
                Cocktail Wizard
              </h1>
              <div className="top-buffer-20 landing-autocomplete">
                <AddIngredientInput placeholder="add an ingredient..." />
              </div>
            </div>
          </header>

          <div className={ this.state.splitted ? "white-nav" : "white-nav before" } style={ this.state.scrollTop >= 400 ? { position: "fixed", top: "0px", transition: "none" } : {} }>
            <div className="container">
              <ul>
                <li>Morango</li>
                <li>Abacaxi</li>
              </ul>
            </div>
          </div>

          <div className={ this.state.splitted ? "recipe-list" : "recipe-list before" }>
            <div className="container" style={ this.state.splitted ? {} : { display: "none" }}>
              { this.state.splitted ?
              <div><RecipeCard hasImage={ true } />
              <RecipeCard hasImage={ false } />
              <RecipeCard hasImage={ false } />
              <RecipeCard hasImage={ false } /></div>
              : null }
            </div>
          </div>


        {/*<RecipeSearch recipesList={ allRecipes } penian={ this.state.splitted } />*/}
        </div>);
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
    if (this.props.hasImage) {
      return (<div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-image">
                    <img className="responsive-image" src="static/img/cocktail.jpg" alt="Nome do drink" />
                    <h4 className="card-title">
                      Strawberry and Pineapple Juice
                      <span className="missing">1 missing</span>
                    </h4>

                  </div>
                  <div className="card-content">
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

module.exports = HomePage;
