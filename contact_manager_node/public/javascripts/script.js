const  App = (function() {
  const $main = $('main');
  const $empty = $main.find('.empty');
  const $list = $main.find('#contacts-list');
  const $aside = $('aside');
  const $form = $aside.find('form');

  let contacts = [];
  let templates = {};
  let editMode = false;

  $('script[type="text/x-handlebars"]').each(function() {
    let $templ = $(this);
    templates[$templ.attr('id')] = Handlebars.compile($templ.html());
  });

  $('script[data-type=partial]').each(function() {
    let $partial = $(this);
    Handlebars.registerPartial($partial.attr('id'), $partial.html());
  });

  const Helpers = {
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
      contacts.length === 0 ? $empty.show() : $empty.hide();
    },

    getContact: function(id) {
      return contacts.filter(contact => contact.id === id)[0];
    },
    populateForm: function(edited) {
      $form.find('#full_name').val(edited.full_name);
      $form.find('#phone_number').val(edited.phone_number);
      $form.find('#email').val(edited.email);
      $form.find('#tags').val(edited.tags);
    },

    updateContacts: function(updatedContact) {
      contacts.forEach((contact, idx) => {
        if (updatedContact.id === contact.id) {
          contacts[idx] = updatedContact;
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

    init: function() {
      return this;
    }
  };

  const Requests = {
    loadContacts: function() {
      let request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000/api/contacts');

      request.addEventListener('load', (e) => {
        let res = JSON.parse(request.response);
        res = res.map(contact => this.helpers.transformTags(contact));
        contacts = res;
        $list.append(templates.contacts({contacts: res}));
        this.helpers.toggleEmpty();
      });

      request.send();
    },

    processCreateRequest: function(data) {
      if (editMode) {
        let id = +$form.find('[data-mode=edit]').val();
        this.processEditRequest(data, id);
        return;
      }

      let request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:3000/api/contacts/');
      request.setRequestHeader('Content-Type', 'application/json');

      request.addEventListener('load', (e) => {
        let contact = JSON.parse(request.response);
        contact = this.helpers.transformTags(contact);
        contacts.push(contact);
        $list.append(templates.contact(contact));
        this.helpers.showContacts();
        $form.get(0).reset();
        this.helpers.toggleEmpty();
      });

      request.send(JSON.stringify(data));
    },

    processDeleteRequest: function(id) {
      let request = new XMLHttpRequest();

      request.open('DELETE', 'http://localhost:3000/api/contacts/' + id);

      request.addEventListener('load', () => {
        this.helpers.findTarget(id).remove();
        contacts = contacts.filter(contact => contact.id !== id);
        this.helpers.toggleEmpty();
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
        contact = this.helpers.transformTags(contact);
        this.helpers.updateContacts(contact);
        this.helpers.findTarget(id).replaceWith(templates.contact(contact));
        this.helpers.showContacts();
        $form.get(0).reset();
        editMode = false;
      });

      request.send(JSON.stringify(data));
    },

    init: function(helperObj) {
      this.helpers = helperObj;
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

      this.helpers.showContacts();
      $form.get(0).reset();
    },

    createContact: function(e) {
      e.preventDefault();

      let data = this.helpers.getDataObj($form);
      if (!this.helpers.validTags(data.tags)) {
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
      let contactDetails = this.helpers.getContact(id);

      editMode = true;
      this.helpers.populateForm(contactDetails);
      this.showForm(e);
      $form.find('[data-mode=edit]').val(id);
    },

    filterTags: function(e) {
      e.preventDefault();
      let tag = e.target.textContent;

      contacts.forEach(contact => {
        if(!contact.tags.includes(tag)) {
          this.helpers.findTarget(contact.id).hide();
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

      contacts.forEach(contact => {
        let name = contact.full_name.toLowerCase();
        if (!name.startsWith(query)) {
          this.helpers.findTarget(contact.id).hide();
        } else {
          this.helpers.findTarget(contact.id).show();
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
      this.helpers = Helpers.init();
      this.requests = Requests.init(this.helpers);
      
      this.filterSearch = this.helpers.debounce(this.filterSearch.bind(this), 250);
      this.requests.loadContacts();
      this.bindEvents();
    }
  };
})();

$(App.init.bind(App));

