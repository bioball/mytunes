// SongQueueView.js - Defines a backbone view class for the song queue.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.SongQueueView = Backbone.View.extend({

  initialize: function() {
    this.collection.on('add remove', function(){
      this.render();
    }, this);
    this.$el.html('<h3>Playlist</h3>');
    this.render();
  },

  render: function() {
    // return this.$el;
    var $queueBody;
    if(this.$el.find('ul')[0]) {
      $queueBody = $(this.$el.find('ul')).html('');
    } else {
      this.$el.append('<ul></ul>');
      $queueBody = $(this.$el.find('ul'));
    }

    // var $queueBody = $(this.$el.find('ul')).html('') || $(this.$el.html('<ul></ul>'));
    // debugger;
    this.collection.each(function(song){
      var queueEntryView = new MyTunes.Views.SongQueueEntryView({model: song});
      queueEntryView.render();
      $queueBody.append(queueEntryView.el);
    }, this);
  }

});
