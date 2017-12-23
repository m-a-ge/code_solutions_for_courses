// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    command = command.split(' ');
    var operation = command[0];
    if ( operation === 'ADD' ) {
        var contact = command[1];
        var phones = command[2];
        if ( !phoneBook.hasOwnProperty(contact) ) {
            phoneBook[contact] = phones.split(',');
        } else {
            phones.split(',').forEach(function (element) {
                phoneBook[contact].push(element);
            });
        }
    } else if ( operation === 'REMOVE_PHONE' ) {
        var phone = command[1];
        var remove = function (array, element) {
            var index = array.indexOf(element);

            if (index !== -1) {
                array.splice(index, 1);
                return true;
            }
            return false;
        };
        var phoneRemoved = false;
        for (var key in phoneBook) {
            if ( phoneBook.hasOwnProperty(key) ) {
                phoneRemoved = remove(phoneBook[key], phone);
                if (phoneRemoved && phoneBook[key].length == 0) {
                    delete phoneBook[key];
                }
            }
        }
        return phoneRemoved;

    } else if ( operation === 'SHOW') {
        var contacts = [];
        var contactStr = '';
        for (var key in phoneBook) {
            contactStr += key + ': ';
            if ( phoneBook.hasOwnProperty(key) ) {
                contactStr +=  phoneBook[key].join(', ');
            }
            contacts.push(contactStr);
            contactStr = '';
        }
        return contacts.sort();
    }


};
