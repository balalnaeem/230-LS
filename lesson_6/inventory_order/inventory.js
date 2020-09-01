var inventory;

(function() {
  inventory = {
    last_id: 0,
    collection: [],

    setDate: function() {
      let date = new Date();
      $('#order_date').text(date.toGMTString());
    },

    cacheTemplate: function() {
      const $i_tmpl = $('#inventory_item').remove();
      this.template = $i_tmpl.html();
    },

    add: function() {
      this.last_id += 1;
      let item = {
        id: this.last_id,
        name: '',
        stockNumber: '',
        quantity: 1
      };

      this.collection.push(item);
      return item;
    },

    remove: function(idx) {
      this.collection = this.collection.filter(item => {
        return item.id !== idx;
      });
    },

    update: function($item) {
      let id = this.findID($item);
      let item = this.getItem(id);

      item.name = $item.find('[name^=item_name]').val();
      item.stockNumber = $item.find('[name^=item_stock_number]').val();
      item.quantity = $item.find('[name^=item_quantity]').val();
    },

    newItem: function(e) {
      e.preventDefault();
      let item = this.add();
      let $item = $(this.template.replace(/ID/g, item.id));

      $('#inventory').append($item);
    },

    deleteItem: function(e) {
      e.preventDefault();
      let $item = this.findParent(e, 'tr').remove();
      this.remove(this.findID($item));
    },

    updateItem: function(e) {
      let $item = this.findParent(e, 'tr');

      this.update($item);
    },

    getItem: function(id) {
      let foundItem;

      this.collection.forEach(item => {
        if (item.id === id) {
          foundItem = item;
          return false;
        }
      });

      return foundItem;
    },

    findParent: function(e, parent) {
      return $(e.target).closest(parent);
    },

    findID: function($item) {
      return +$item.find('input[type=hidden]').val()
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