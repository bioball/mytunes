// SongQueueView.js - Defines a backbone view class for the song queue.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.SongQueueView = Backbone.View.extend({

  el: 'tbody',

  initialize: function() {

    this.collection.on('add remove', function(){
      this.render();
    }, this);

    vents.on('changePlaylist', function(){
      this.render();
    }, this);

    this.render();
  },

  render: function() {
    this.$el.html('<h3>Now Playing</h3>');

    var $queueBody = this.$el.html('');

    this.collection.each(function(song){
      var queueEntryView = new MyTunes.Views.SongQueueEntryView({model: song});
      queueEntryView.render();
      $queueBody.append(queueEntryView.el);
    }, this);
    return this;
  },

  remove: function(song){
    this.collection.takeOut(song);
  }

});
