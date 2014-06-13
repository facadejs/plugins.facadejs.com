Handlebars.registerHelper('date', function(value) {
    return moment(value).fromNow();
});
