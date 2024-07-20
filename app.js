new Vue({
  el: '#events',

  data: {
    event: { title: '', detail: '', date: '' },
    events: []
  },

  ready: function () {
    this.fetchEvents();
  },

  methods: {

    fetchEvents: function () {
      var events = [];
      this.$http.get('/api/events')
        .success(function (events) {
          this.$set('events', events);
          console.log(events);
        })
        .error(function (err) {
          console.log(err);
        });
    },

    addEvent: async function () {
      if (this.event.title.trim()) {

        this.event.id = uuidv4();

        try {

          const params = {
            TableName: 'EventsTable',
            Item: this.event
          };
          await dynamodb.put(params).promise();

          this.events.push(this.event);
          console.log('Event added!');
        } catch (err) {
          console.error('Error saving event to DynamoDB', err);
        }
      }
    },

    deleteEvent: function (id) {
      if (confirm('Are you sure you want to delete this event?')) {
        this.$http.delete('api/events/' + id)
          .success(function (res) {
            console.log(res);
            var index = this.events.findIndex(x => x.id === id);
            this.events.splice(index, 1);
          })
          .error(function (err) {
            console.log(err);
          });
      }
    }
  }
});
