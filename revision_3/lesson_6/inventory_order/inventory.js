var inventory;

(function() {
	let id = 0;
	let collection = [];
	let template = cacheTemplate();

	function getItemId() {
			id += 1;
			return id;
		};

  function cacheTemplate() {
      let itemTemp = $('#inventory_item').remove().html();
			return Handlebars.compile(itemTemp);
    };

  inventory = {
    setDate: function() {
      let date = new Date();
      $('#order_date').text(date.toGMTString());
    },

		createItem: function() {
			let itemObj = {
				id: getItemId(),
				name: '',
				stockNumber: '',
				quantity: 1,
			};

			collection.push(itemObj);
			return itemObj;
		},

		addItem: function(e) {
			e.preventDefault();

			let $table = $('#inventory');
			let item = this.createItem();
			let $item = $(template({id: item.id}));

			$table.append($item);
		},

		removeFromCollection: function($item) {
			let id = +$item.find('input[name^=item_id]').val();
			collection = collection.filter(itemObj => {
				return itemObj.id !== id;
			});
		},

		deleteItem: function(e) {
			e.preventDefault();
			let $item = this.findParentEle(e, 'tr').remove();
			this.removeFromCollection($item);
		},

		findParentEle: function(e, ele) {
			return $(e.target).closest(ele);
		},

		getValue: function($ele, selector) {
			return $ele.find(selector).val();
		},

		updateCollection: function($item) {
			collection.forEach(itemObj => {
				if (itemObj.id === +this.getValue($item, '[type=hidden]')) {
					itemObj.name = this.getValue($item, '[name^=item_name]');
					itemObj.stockNumber = this.getValue($item, '[name^=item_stock_num]');
					itemObj.quantity = this.getValue($item, '[name^=item_quantity]');
				}
			});
		},

		updateItem: function(e) {
			let $item = this.findParentEle(e, 'tr'); 
			this.updateCollection($item);
		},

		
		bindEvents: function(e) {
			$('#add_item').on('click', this.addItem.bind(this));
			$('#inventory').on('click', 'a.delete', this.deleteItem.bind(this));
			$('#inventory').on('blur', ':input', this.updateItem.bind(this));
		},

    init: function() {
      this.setDate();
			this.bindEvents();
    },
  };
})();

$(inventory.init.bind(inventory));
