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
  },

  playFirst: function(){
    this.at(0).play();
  },

  takeOut: function(song){
    // debugger;
    this.remove(song);
    this.updateStorage(song);
  },

  updateStorage: function(song){
    var songStorage = JSON.parse(localStorage['playlist']);
    var removeSong = song;
    delete songStorage[removeSong.cid];
    localStorage['playlist'] = JSON.stringify(songStorage);
  }

});
