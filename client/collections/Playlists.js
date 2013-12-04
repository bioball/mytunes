window.MyTunes = window.MyTunes || {};
window.MyTunes.Collections = window.MyTunes.Collections || {};

MyTunes.Collections.Playlists = Backbone.Collection.extend({
  initialize: function(){
    vents.on('trigglePlot', function(playlistName){
      var playlist = {
        name: playlistName,
        list: {}
      };
      this.add(playlist);
      var playlists = JSON.parse(localStorage['playlist']);
      playlists.push(playlist);
      localStorage['playlist'] = JSON.stringify(playlists);
      localStorage['currentPlaylist'] = playlistName;

      vents.trigger('trigglePlumBum');
      vents.trigger('changePlaylist');
    }, this);
  }
});