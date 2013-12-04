window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.PlaylistEntryView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click a': 'changePlaylist'
  },

  render: function(){
    this.$el.html('<a href="#">' + this.model.get('name') + '</a>');
    return this;
  },

  changePlaylist: function(){

    vents.trigger('changePlaylist', this.model);

    localStorage.currentPlaylist = this.model.get('name');
  }

});