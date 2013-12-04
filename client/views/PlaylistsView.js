window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.PlaylistsView = Backbone.View.extend({

  el: 'div .playlists',

  initialize: function(){
    this.render();

    vents.on('trigglePlumBum', this.render, this);
  },

  events: {
    'click .submit': 'createPlaylist'
  },

  template: '<form><input type="text" class="playlistName" placeholder="Create a new playlist"/><button class="submit">Go</button></form>',

  render: function(){
    this.$el.children().detach();

    this.$el.html(this.template);
    var self = this;
    this.collection.each(function(playlist){
      self.$el.append(new MyTunes.Views.PlaylistEntryView({model: playlist}).render().el);
    });
  },

  createPlaylist: function(event){
    event.preventDefault();
    vents.trigger('trigglePlot', this.$el.find('input').val());
    this.$el.find('input').val('');
  }
});