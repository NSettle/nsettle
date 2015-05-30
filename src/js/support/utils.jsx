module.exports = {
  dispatch: function(event, data){
    var temp_event = new CustomEvent(event, { detail: data });
    document.dispatchEvent(temp_event);
  }
}
