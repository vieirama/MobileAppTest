var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#" id="' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
                document.getElementById(e.id).addEventListener("click", initShowAlert, false);
            }
        });
    },

    initialize: function() {
        var self = this;
        this.store = new MemoryStore(function() {
            showAlert('Welcome to our web app!', '');
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
};

app.initialize();

function initShowAlert(selectedElement) {
    showAlert(this.text, 'You selected the following character');
}

function showAlert(message, title) {
    if (navigator.notification) {
        navigator.notification.alert(message, null, title, 'OK');
    } else {
        alert(title ? (title + ": " + message) : message);
    }
}