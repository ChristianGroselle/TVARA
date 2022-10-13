var saveBtnEl = $('.saveBtn');
var testEl = $('#test');

saveBtnEl.click(function() {
    let parentEl = $('this').parent().parent().parent().parent().parent().data('meta');
    console.log('el' + parentEl);
})