// LibraryView.js - Defines a backbone view class for the music library.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.LibraryView = Backbone.View.extend({

  el: "#librarytbody",

  initialize: function() {
    this.collection.on('play', function(){
      this.render();
    }, this);

    this.render();
  },

  render: function(){
    // to preserve event handlers on child nodes, we must call .detach() on them before overwriting with .html()
    // see http://api.jquery.com/detach/
    this.$el.children().detach();

    this.$el.append(
      this.collection.map(function(song){
        return new MyTunes.Views.LibraryEntryView({model: song}).render();
      })
    );
  }

});
