const  App = (function() {
  const $main = $('main');
  const $aside = $('aside');
  const $empty = $main.find('.empty');
  const $list = $main.find('#contacts-list');
  const $form = $aside.find('form');

  const Helper = {
    debounce: function(func, delay) {
      let timeout;

      return function(...args) {
        if (timeout) { clearTimeout(timeout) };
        timeout = setTimeout(() => func.apply(null, args), delay);
      };
    },

    showContacts: function() {
      $aside.hide();
      $main.show();
    },

    findTarget: function(id) {
      return $list.find(`li[data-id=${id}]`);
    },

    toggleEmpty: function() {
      this.contacts.length === 0 ? $empty.show() : $empty.hide();
    },

    getContact: function(id) {
      return this.contacts.filter(contact => contact.id === id)[0];
    },
    populateForm: function(edited) {
      $form.find('#full_name').val(edited.full_name);
      $form.find('#phone_number').val(edited.phone_number);
      $form.find('#email').val(edited.email);
      $form.find('#tags').val(edited.tags);
    },

    updateContacts: function(updatedContact) {
      this.contacts.forEach((contact, idx) => {
        if (updatedContact.id === contact.id) {
          this.contacts[idx] = updatedContact;
        }
      });
    },

    getDataObj: function($form) {
      let o = {};

      $form.serializeArray().forEach(obj => {
        o[obj.name] = obj.value;
      });

      return o;
    },

    transformTags: function(contact) {
      if (contact.tags !== '') {
        contact.tags = contact.tags.split(',');
      }

      return contact;
    },

    validTags: function(tags) {
      tags = tags.split(',');
      let uniqTags = tags.filter((tag, idx, self) => self.indexOf(tag) === idx);
      return tags.length === uniqTags.length;
    },

    cacheTemplates: function() {
      let self = this;
      $('script[type="text/x-handlebars"]').each(function() {
        let $templ = $(this);
        self.templates[$templ.attr('id')] = Handlebars.compile($templ.html());
      });
    },

    registerPartials: function() {
      $('script[data-type=partial]').each(function() {
        let $partial = $(this);
        Handlebars.registerPartial($partial.attr('id'), $partial.html());
      });
    },

    init: function() {
      this.contacts = [];
      this.templates = {};
      this.editMode = false;
      this.cacheTemplates();
      this.registerPartials();
      return this;
    }
  };

  const Requests = {
    loadContacts: function() {
      let request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000/api/contacts');

      request.addEventListener('load', (e) => {
        let res = JSON.parse(request.response);
        res = res.map(contact => this.helper.transformTags(contact));
        this.helper.contacts = res;
        $list.append(this.helper.templates.contacts({contacts: res}));
        this.helper.toggleEmpty();
      });

      request.send();
    },

    processCreateRequest: function(data) {
      if (this.helper.editMode) {
        let id = +$form.find('[data-mode=edit]').val();
        this.processEditRequest(data, id);
        return;
      }

      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/contacts/');
      request.setRequestHeader('Content-Type', 'application/json');

      request.addEventListener('load', (e) => {
        let contact = JSON.parse(request.response);
        contact = this.helper.transformTags(contact);
        this.helper.contacts.push(contact);
        $list.append(this.helper.templates.contact(contact));
        this.helper.showContacts();
        $form.get(0).reset();
        this.helper.toggleEmpty();
      });

      request.send(JSON.stringify(data));
    },

    processDeleteRequest: function(id) {
      let request = new XMLHttpRequest();

      request.open('DELETE', 'http://localhost:3000/api/contacts/' + id);

      request.addEventListener('load', () => {
        this.helper.findTarget(id).remove();
        this.helper.contacts = this.helper.contacts.filter(contact => contact.id !== id);
        this.helper.toggleEmpty();
      });

      request.send();
    },

    processEditRequest: function(data, id) {
      data.id = id;

      let request = new XMLHttpRequest();
      request.open('PUT', 'http://localhost:3000/api/contacts/' + id);
      request.setRequestHeader('Content-Type', 'application/json');

      request.addEventListener('load', e => {
        let contact = JSON.parse(request.response);
        contact = this.helper.transformTags(contact);
        this.helper.updateContacts(contact);
        this.helper.findTarget(id).replaceWith(this.helper.templates.contact(contact));
        this.helper.showContacts();
        $form.get(0).reset();
        this.helper.editMode = false;
      });

      request.send(JSON.stringify(data));
    },

    init: function(helperObj) {
      this.helper = helperObj;
      return this;
    },
  };

  return {
    showForm: function(e) {
      e.preventDefault();

      $main.hide();
      $aside.show();
    },

    cancelForm: function(e) {
      e.preventDefault();

      this.helper.showContacts();
      $form.get(0).reset();
    },

    createContact: function(e) {
      e.preventDefault();

      let data = this.helper.getDataObj($form);
      if (!this.helper.validTags(data.tags)) {
        alert('Duplicate tags are not allowed');
        return;
      }

      this.requests.processCreateRequest(data);
    },


    deleteContact: function(e) {
      e.preventDefault();

      let answer = confirm('Are you sure?');
      if (!answer) return;

      let id = +$(e.target).parent().attr('data-id');
      this.requests.processDeleteRequest(id);
    },

    editContact: function(e) {
      let id = +$(e.target).parent().attr('data-id');
      let contactDetails = this.helper.getContact(id);

      this.helper.editMode = true;
      this.helper.populateForm(contactDetails);
      this.showForm(e);
      $form.find('[data-mode=edit]').val(id);
    },

    filterTags: function(e) {
      e.preventDefault();
      let tag = e.target.textContent;

      this.helper.contacts.forEach(contact => {
        if(!contact.tags.includes(tag)) {
          this.helper.findTarget(contact.id).hide();
        }
      });

      $('#show-all').show();
    },

    showAll: function(e) {
      e.preventDefault();

      $('li').show();
      $(e.target).hide();
    },

    filterSearch: function(e) {
      let query = e.target.value.toLowerCase();

      this.helper.contacts.forEach(contact => {
        let name = contact.full_name.toLowerCase();
        if (!name.startsWith(query)) {
          this.helper.findTarget(contact.id).hide();
        } else {
          this.helper.findTarget(contact.id).show();
        }
      });
    },

    bindEvents: function() {
      $('.add-contact').on('click', this.showForm.bind(this));
      $('.cancel').on('click', this.cancelForm.bind(this));
      $('input[name=search]').on('input', this.filterSearch);
      $form.on('submit', this.createContact.bind(this));
      $list.on('click', '#delete-contact', this.deleteContact.bind(this));
      $list.on('click', '#edit-contact', this.editContact.bind(this));
      $list.on('click', '.tag-link', this.filterTags.bind(this));
      $main.on('click', '#show-all', this.showAll.bind(this));
    },

    init: function() {
      this.helper = Helper.init();
      this.requests = Requests.init(this.helper);
      
      this.filterSearch = this.helper.debounce(this.filterSearch.bind(this), 250);
      this.requests.loadContacts();
      this.bindEvents();
    }
  };
})();

$(App.init.bind(App));

