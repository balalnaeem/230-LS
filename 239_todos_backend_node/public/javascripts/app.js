const App = (function() {
  const Ui = {
    editMode: false,

    get: function(selector) {
      return $(selector);
    },

    cacheTemplates: function() {
      let self = this;
      $('script[type="text/x-handlebars"]').each(function() {
        let id = $(this).attr('id');
        let html = $(this).html();
        self.templates[id] = Handlebars.compile(html);
      });
    },

    registerPartials: function() {
      $('script[data-type="partial"]').each(function() {
        let id = $(this).attr('id');
        let html = $(this).html();
        Handlebars.registerPartial(id, html);
      });
    },

    showModal: function(e) {
      e.preventDefault();

      this.$modal.show();
    },

    hideModal: function(e) {
      this.$modal.hide();
      this.$form.get(0).reset();
      this.editMode = false;
    },

    toggleCheckbox: function(span) {
      let $checkbox = $(span).find('[type=checkbox]');
      $checkbox[0].checked = !$checkbox[0].checked;
      $checkbox.trigger('input');
    },

    init: function() {
      this.templates = {};
      this.$currentCount = this.get('.current-count');
      this.$allCount = this.get('.all-count');
      this.$compCount = this.get('.completed-count');
      this.$add = this.get('.add-todo');
      this.$modal = this.get('.modal');
      this.$form = this.get('form');
      this.$list = this.get('#todo-list');
      this.$nav = this.get('nav');

      this.cacheTemplates();
      this.registerPartials();

      return this;
    }
  };

  const Helper = {
    getFormData: function($form) {
      let o = {};
      $form.serializeArray().forEach(field => {
        o[field.name] = field.value;
      });

      return o;
    },

    getItemId: function($ele) {
      return +$ele.closest('li').attr('data-id');
    },

    populateForm: function($form, todo) {
      $form.find('#title').val(todo.title);
      $form.find('#day').val(todo.day);
      $form.find('#month').val(todo.month);
      $form.find('#year').val(todo.year);
      $form.find('#description').val(todo.description);
    },

    init: function() {
      return this;
    }
  };

  const Nav = {
    allTodos: [],
    completedTodos: [],

    filterCompleted: function() {
      this.completedTodos = this.allTodos.filter(todo => todo.completed);
    },

    buildCompList: function() {
      let compDatesList = {};

    },

    buildList:  function(todos) {
      let list = {};

      todos.forEach(todo => {
        let date = `${todo.month}/${todo.year}`;

        if (todo.month === '' || todo.year === '') {
          date = 'No Due Date';
        }

        list[date] ||= [];
        list[date].push(todo);
      });

      return list;
    },

    buildForTempl: function(list) {
      let data = [];

      for (let date in list) {
        let o = {};
        o.dueDate = date;
        o.total = list[date].length;
        o.month = list[date][0].month;
        o.year = list[date][0].year;
        data.push(o);
      }

      return data;
    },

    renderNav: function(data, $list) {
      $list.html(this.ui.templates.months({months: data}));
    },

    loadAll: function() {
      let list = this.buildList(this.allTodos);
      let data = this.buildForTempl(list);
      let $navList = this.ui.$nav.find('.all-months');
      this.renderNav(data, $navList);
      this.ui.$allCount.text(this.allTodos.length);
    },

    loadCompleted: function() {
      this.filterCompleted();
      let list = this.buildList(this.completedTodos);
      let data = this.buildForTempl(list);
      let $navList = this.ui.$nav.find('.completed-months');
      this.renderNav(data, $navList);
      this.ui.$compCount.text(this.completedTodos.length);
    },

    loadBoth: function() {
      this.loadAll();
      this.loadCompleted();
    },

    init: function(ui) {
      this.ui = ui
      return this;
    },
  };

  const Todos = {
    collection: [],

    getTodo: function(id) {
      return this.collection.filter(todo => todo.id === id)[0];
    },

    removeFromCollection: function(id) {
      let index;

      this.collection.forEach((todo, idx) => {
        if (todo.id === id) {
          index = idx;
        }
      });

      this.collection.splice(index, 1);
    },

    updateCollection: function(updated) {
      this.collection.forEach((todo, idx) => {
        if(todo.id === updated.id) {
          this.collection[idx] = updated;
        }
      });
    },

    sortList: function() {
      this.collection.sort((todo1, todo2) => todo1.id - todo2.id);
      this.collection.sort((todo1, todo2) => {
        if (!todo1.completed && todo2.completed) {
          return -1;
        } else if (!todo2.completed && todo1.completed) {
          return 1;
        } else {
          return 0;
        }
      });
    },

    loadAll: function() {
      let req = new XMLHttpRequest();
      req.open('GET', '/api/todos');

      req.addEventListener('load', () => {
        let res = JSON.parse(req.response);
        this.collection = res;
        this.sortList();
        this.nav.allTodos = this.collection;
        this.nav.loadBoth();
        this.ui.$currentCount.text(this.collection.length);
        this.ui.$list.html(this.ui.templates.todos({todos: this.collection}));
      });

      req.send();
    },

    loadCompleted: function() {
      let completedTodos = this.collection.filter(todo => todo.completed);
      this.ui.$list.html(this.ui.templates.todos({todos: completedTodos}));
      this.ui.$heading.text('Completed');
      this.ui.$currentCount.text(completedTodos.length);
    },

    add: function(json) {
      let req = new XMLHttpRequest();
      req.open('POST', '/api/todos');
      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load', () => {
        let res = JSON.parse(req.response);
        this.ui.$list.append(this.ui.templates.todo(res));
        this.ui.hideModal();
        this.collection.push(res);
        this.nav.loadAll();
      });

      req.send(json);
    },

    delete: function(id) {
      let req = new XMLHttpRequest();
      req.open('DELETE', '/api/todos/' + id);

      req.addEventListener('load', () => {
        if (req.status === 204) {
          this.ui.get('li[data-id=' + id + ']').remove();
          this.removeFromCollection(id);
          this.nav.loadBoth();
        }
      });

      req.send();
    },

    updateState: function(state, id) {
      let req = new XMLHttpRequest();
      req.open('PUT', '/api/todos/' + id);
      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load', () => {
        let res = JSON.parse(req.response);
        this.updateCollection(res);
        this.sortList();
        this.nav.loadBoth();
        this.ui.$list.html(this.ui.templates.todos({todos: this.collection}));
        this.ui.hideModal();
      });

      req.send(JSON.stringify({completed: state}));
    },

    updateTodo: function(data) {
      let id = +this.ui.$form.find('[data-mode="edit"]').val();
      let req = new XMLHttpRequest();
      req.open('PUT', '/api/todos/' + id);
      req.setRequestHeader('Content-Type', 'application/json');

      req.addEventListener('load', () => {
        let res = JSON.parse(req.response);
        this.updateCollection(res);
        this.sortList();
        this.ui.$list.html(this.ui.templates.todos({todos: this.collection}));
        this.ui.hideModal();
      });

      req.send(JSON.stringify(data));
    },

    init: function(ui, nav) {
      this.ui = ui;
      this.nav = nav;
      this.loadAll();
      return this;
    }
  };

  return {
    addHandler: function(e) {
      e.preventDefault();
      let data = this.helper.getFormData(this.ui.$form); 

      if (this.ui.editMode) {
        this.todos.updateTodo(data);
        return;
      }

      this.todos.add(JSON.stringify(data));
    },

    deleteHandler: function(e) {
      e.preventDefault();

      let id = this.helper.getItemId($(e.target));
      this.todos.delete(id);
    },

    spanClickHandler: function(e) {
      if (e.target.tagName === 'SPAN') {
        this.ui.toggleCheckbox(e.target);
      }
    },

    checkHandler: function(e) {
      let state = e.target.checked;
      let id = this.helper.getItemId($(e.target));

      this.todos.updateState(state, id);
    },

    markCompleteHandler: function(e) {
      if (!this.ui.editMode) {
        alert('Cannot mark complete as Todo has not been created yet!');
        return;
      }

      let id = +this.ui.$form.find('[data-mode="edit"]').val();
      this.todos.updateState(true, id);
    },

    editHandler: function(e) {
      e.preventDefault();

      let id = this.helper.getItemId($(e.target));
      let todo = this.todos.getTodo(id);
      this.ui.showModal(e);
      this.helper.populateForm(this.ui.$form, todo);
      this.ui.$form.find('[data-mode="edit"]').val(id);
      this.ui.editMode = true;
    },

    renderCompleted: function(e) {
      e.preventDefault();

      this.todos.loadCompleted();
    },

    bindEvents: function() {
      this.ui.$add.on('click', this.ui.showModal.bind(this.ui));
      this.ui.$form.on('submit', this.addHandler.bind(this));
      this.ui.$form.on('click', '#btn-done', this.markCompleteHandler.bind(this));
      this.ui.$list.on('click', '.delete-todo', this.deleteHandler.bind(this));
      this.ui.$list.on('click', 'span', this.spanClickHandler.bind(this));
      this.ui.$list.on('input', 'input[type=checkbox]', this.checkHandler.bind(this));
      this.ui.$list.on('click', '.edit-todo', this.editHandler.bind(this));
      this.ui.$modal.on('click', '.modal-layer', this.ui.hideModal.bind(this.ui));
      this.ui.$nav.on('click', '.completed-todos', this.renderCompleted.bind(this));
      //this.ui.$nav.on('click', '.all-todos', this.renderAll.bind(this));
    },

    init: function() {
      this.ui = Ui.init();
      this.nav = Nav.init(this.ui);
      this.todos = Todos.init(this.ui, this.nav);
      this.helper = Helper.init();

      this.bindEvents();
    }
  };
})();

$(App.init.bind(App));
