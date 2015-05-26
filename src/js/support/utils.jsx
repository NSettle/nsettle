//var utils = {};

// utils.dispatch = function(event, data) {
//     var temp_event = new CustomEvent(event, { detail: data });
//     window.dispatchEvent(temp_event);
// }

module.exports = {
  dispatch: function(event, data){
    var temp_event = new CustomEvent(event, { detail: data });
    document.dispatchEvent(temp_event);
  }
}
