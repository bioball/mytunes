// AppModel.js - Defines a backbone model class for the whole app.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Models = window.MyTunes.Models || {};

MyTunes.Models.AppModel = Backbone.Model.extend({

  initialize: function(params){
    this.set('currentSong', new MyTunes.Models.SongModel());
    this.set('songQueue', new MyTunes.Collections.SongQueue());

    params.library.on('play', function(song){
      this.set('currentSong', song);
    }, this);

    params.library.on('enqueue', function(song){
      // debugger;
      this.get('songQueue').add(song);
      var songStorage = localStorage['playlist'] ? JSON.parse(localStorage['playlist']) : {};
      songStorage[song.cid] = true;
      localStorage['playlist'] = JSON.stringify(songStorage);
    }, this);
  },

  loadFromLocalStorage: function(){
    if(localStorage['playlist']){
      var songs = JSON.parse(localStorage['playlist']);
      var self = this;
      _(songs).each(function(bool, songID){
        var song = self.get('library').get(songID);
        self.get('songQueue').add(song);
      });
    }
  }
});