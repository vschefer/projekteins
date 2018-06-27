;(function() {
  'use strict';
  
  jQuery(function($) {
    
    async function init() {
      if(localStorage.getItem('style') == 'light'){
        $('body').addClass('style--light');
        $('.switch-style').html('Dunkles Design');
      };
      renderNotes(await getNotes());
    };
    
    init();
    
    $('.open-new-note').on('click', async function(event) {
      $('.modal').removeData('update');
      $('.modal')[0].reset();
      await openEdit();
    });
    
    $('.cancel-note').on('click', async function(event) {
      await closeEdit();
    });
    
    $('.sortBy').on('click', async function(event) {
      $('.sortBy').removeClass('sortBy--active');
      $(this).addClass('sortBy--active');
      renderNotes(await getNotes($(this).data('sort'), await getActiveFilter()));
    });
    
    $(document).on('click', '.delete-note', async function(event) {
      deleteNote($(this).data('note'));
      renderNotes(await getNotes(await getActiveSort(), 'archived'));
    });
    
    $(document).on('click', '.load-edit', async function(event) {
      const note = await getNote($(this).data('note'));
      $('.modal').data('update', note._id);
      $('[name=title]').val(note.title);
      $('[name=content]').val(note.content);
      $('[name=importance][value=' + note.importance + ']').attr('checked', 'checked');
      $('[name=date_due]').val(note.date_due);
      await openEdit();
    });
    
    $('.modal').submit(async function(event) {
      event.preventDefault();
      if ($(this).data('update')){
        await updateNote($(this).data('update'), $(this).serializeArray());
      } else {
        await addNote($(this).serializeArray());
      }
      renderNotes(await getNotes());
      await closeEdit();
      this.reset();
    });
    
    $('.switch-style').on('click', function(event) {
      $(this).html(function(){
        return ($('body').hasClass('style--light') ? 'Helles Design' : 'Dunkles Design');
      });
      $('body').toggleClass('style--light');
      localStorage.getItem('style') == 'light' ? localStorage.setItem('style', 'dark') : localStorage.setItem('style', 'light');
    });
    
    function renderNotes(notes) {
      notes.forEach(function(note) {
        note.date_formatted = moment(note.date).format('DD.MM.YYYY');
        note.time_formatted = moment(note.date).format('HH:mm');
        note.date_due_formatted = moment(note.date_due).fromNow();
        switch (note.importance) {
          case '1':
          note.importance_in_words = 'klein';
          break;
          case '2':
          note.importance_in_words = 'normal';
          break;
          case '3':
          note.importance_in_words = 'hoch';
        };
      });
      const noteTemplate = $('#noteTemplate').html();
      const renderedNotes = Handlebars.compile(noteTemplate);
      $('.notes__list').html(renderedNotes(notes));
      
    };
    
    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });
    
    async function openEdit() {
      $('.edit-note').addClass('open');
    };
    
    async function closeEdit() {
      $('.edit-note').removeClass('open');
      $('.dimmer').removeClass('active');
    };
    
    async function getActiveSort() {
      const active_sort = $('.sortBy--active').data('sort');
      return active_sort;
    };
    
    async function getActiveFilter() {
      const active_filter = $('.switch-status--active').data('status');
      return active_filter;
    };
    
  });
  
}());
