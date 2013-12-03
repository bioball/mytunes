// SongQueue.js - Defines a backbone model class for the song queue.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Collections = window.MyTunes.Collections || {};

MyTunes.Collections.SongQueue = MyTunes.Collections.Songs.extend({

  initialize: function(){
    this.on('add', function(){
      if(this.length === 1) {
        this.playFirst();
      }
    }, this);

    // this.on('ended', function(){
    //   this.shift();
    //   if(this.at(0)){
    //     this.playFirst();
    //   }
    // }, this);
    this.on('dequeue', function(){
      this.updateStorage(this.shift());
      if(this.at(0)){
        this.playFirst();
      }
    }, this);
  },

  playFirst: function(){
    this.at(0).play();
  },

  takeOut: function(song){
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
