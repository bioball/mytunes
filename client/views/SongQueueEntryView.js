// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.SongQueueEntryView = Backbone.View.extend({
  tagName: 'li',

  render: function(){
    var artist = this.model.get('artist');
    var title = this.model.get('title');
    this.$el.text(artist + "-" + title);
    return this;
  }

});