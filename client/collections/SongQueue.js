// SongQueue.js - Defines a backbone model class for the song queue.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Collections = window.MyTunes.Collections || {};

MyTunes.Collections.SongQueue = Backbone.Collection.extend({

  model: MyTunes.Models.SongModel,

  initialize: function(){
    this.on('add', function(){
      if(this.length === 1) {
        this.playFirst();
      }
    }, this);

    this.on('dequeue', function(){
      this.updateStorage(this.shift());
      if(this.at(0)){
        this.playFirst();
      }
    }, this);

    this.on('triggle', function(song){
      this.takeOut(song);
    }, this);

    vents.on('changePlaylist', function(){
      this.reset();
      vents.trigger('reload', this);
    }, this);
  },

  playFirst: function(){
    this.at(0).play();
  },

  takeOut: function(song){
    // debugger;
    this.remove(song);
    this.removeFromLocalStorage(song);
  },

  removeFromLocalStorage: function(song){
    var playlists = JSON.parse(localStorage['playlist']);
    var songs;
    var currentPlaylist = localStorage.currentPlaylist;
    _(playlists).each(function(playlist){
      if(currentPlaylist === playlist.name){
        delete playlist.list[song.cid];
      }
    });
    localStorage['playlist'] = JSON.stringify(playlists);
  },

  storeIntoLocalStorage: function(song){
    if(localStorage.currentPlaylist){
      var playlists;
      if(localStorage.playlist){
        playlists = JSON.parse(localStorage.playlist);
        var nameExists = false;
        _(playlists).each(function(playlist){
          if(playlist.name === localStorage.currentPlaylist){
            nameExists = true;
            playlist.list[song.cid] = true;
          }
        });
        if(!nameExists){
          playlists.push(this.createPlaylist(song));
        }
      } else {
        playlists = [];
        playlists.push(this.createPlaylist(song));
      }
      localStorage.playlist = JSON.stringify(playlists);
    }
  },

  createPlaylist: function(song){
    var playlist = {
      name: localStorage.currentPlaylist,
      list: {}
    };
    playlist.list[song.cid] = true;
    return playlist;
  }


});
