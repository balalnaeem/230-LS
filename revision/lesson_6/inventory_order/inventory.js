var inventory;

(function() {
  inventory = {
    lastId: 0,
    collection: [],

    setDate: function() {
      $('#order_date').text(new Date().toUTCString());
    },

    cacheTemplate: function() {
      let $iTmpl = $('#inventory_item').remove();
      this.template = Handlebars.compile($iTmpl.html());
    },

    add: function() {
      this.lastId++;
      let item = {
        id: this.lastId,
        name: '',
        stockNumber: '',
        quantity: 1,
      }

      this.collection.push(item);
      return item;
    },

    remove: function(idx) {
      this.collection = this.collection.filter(function(item) {
        return item.id !== idx;
      });
    },

    get: function(id) {
      let found_item;
      this.collection.forEach(item => {
        if (item.id === id) {
          found_item = item;
          return false;
        }
      });

      return found_item;
    },

    update: function($item) {
      let id = this.findID($item);
      let item = this.get(id);

      item.name = $item.find('input[name^=item_name]').val();
      item.stockNumber = $item.find('input[name^=item_stock_number]').val();
      item.quantity = $item.find('input[name^=item_quantity]').val();
    },

    newItem: function(e) {
      e.preventDefault();

      let item = this.add();
      let $item = $(this.template({id: item.id}));
      $('#inventory').append($item);
    },

    findParent: function(e) {
      return $(e.target).closest('tr');
    },

    findID: function($item) {
      return +$item.find('input[type=hidden]').val();
    },

    deleteItem: function(e) {
      e.preventDefault();
      let $item = this.findParent(e).remove();
      this.remove(this.findID($item));
    },

    updateItem: function(e) {
      let $item = this.findParent(e);
      this.update($item);
    },

    bindEvents: function() {
      $('#add_item').on('click', this.newItem.bind(this));
      $('#inventory').on('click', 'a.delete', this.deleteItem.bind(this));
      $('#inventory').on('blur', ':input', this.updateItem.bind(this));
    },

    init: function() {
      this.setDate();
      this.cacheTemplate();
      this.bindEvents();
    },
  };

})();

$(inventory.init.bind(inventory));