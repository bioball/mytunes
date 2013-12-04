// SongQueueEntryView.js - Defines a backbone view class for the song queue entries.
window.MyTunes = window.MyTunes || {};
window.MyTunes.Views = window.MyTunes.Views || {};

MyTunes.Views.SongQueueEntryView = Backbone.View.extend({
  tagName: 'tr',

  template: _.template('<td><%= artist %></td><td><%= title %></td><td><span class="glyphicon glyphicon-remove-circle"></span></td>'),

  events: {
    'click .glyphicon': 'remove'
  },

  render: function(){
    // var artist = this.model.get('artist');
    // var title = this.model.get('title');
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  remove: function(){

    this.model.trigger('triggle', this.model);

  }


});