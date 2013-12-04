// AppModel.js - Defines a backbone model class for the whole app.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Models = window.MyTunes.Models || {};

MyTunes.Models.AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new MyTunes.Models.SongModel());
    this.set('songQueue', new MyTunes.Collections.SongQueue());

    vents.on('reload', this.loadFromLocalStorage, this);

    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song){
      this.get('songQueue').add(song);

      this.get('songQueue').storeIntoLocalStorage(song);
    }, this);
  },

  loadFromLocalStorage: function(){
    if(localStorage['currentPlaylist']){
      var name = localStorage['currentPlaylist'];
      var playlists = JSON.parse(localStorage['playlist']);
      var songs;
      _(playlists).each(function(playlist){
        if(name === playlist.name){
          songs = playlist.list;
        }
      });
      var self = this;
      _(songs).each(function(bool, songID){
        var song = self.get('library').get(songID);
        self.get('songQueue').add(song);
      });
    }
  }


});