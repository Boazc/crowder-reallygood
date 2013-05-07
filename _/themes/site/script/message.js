
var Message = new function() {

    this.register = function(status, message) {
        if (message) {
            var msg_id = 'msg' + Math.floor((Math.random()*1000000)+1);

            $('#messageList').append('<li id="' + msg_id +'" style="display: none;"><div class="alert in alert-block fade alert-' + status + '"><a class="close" data-dismiss="alert">×</a>' + message + '</div></li>');
            //$('#messageList').append('<li id="' + msg_id +'" style="display: none;" class="error roundedCorner"><div class="message" >' + message + '</div></li>' );
            showMessage(msg_id);
            return true;
        }
        return false;
    };

    this.error = function(message) {
        if (message) {
            var msg_id = 'msg' + Math.floor((Math.random()*1000000)+1);

            $('#messageList').append('<li id="' + msg_id +'" style="display: none;"><div class="alert in alert-block fade alert-error"><a class="close" data-dismiss="alert">×</a>' + message + '</div></li>');
            //$('#messageList').append('<li id="' + msg_id +'" style="display: none;" class="error roundedCorner"><div class="message" >' + message + '</div></li>' );
            showMessage(msg_id);
            return true;
        }
        return false;
    };

    this.success = function(message) {
        if (message) {
            var msg_id = 'msg' + Math.floor((Math.random()*1000000)+1);
            //$('#messageList').append(  '<li id="' + msg_id + '" style="display: none;" class="success roundedCorner"><div class="message"> ' + message + '</div></li>' );
            $('#messageList').append('<li id="' + msg_id +'" style="display: none;"><div class="alert in alert-block fade alert-success"><a class="close" data-dismiss="alert">×</a>' + message + '</div></li>');
            showMessage(msg_id);
            return true;
        }
        return false;
    };

    this.warning = function(message) {
        if (message) {
            var msg_id = 'msg' + Math.floor((Math.random()*1000000)+1);
            //$('#messageList').append(  '<li id="' + msg_id + '" style="display: none;" class="success roundedCorner"><div class="message"> ' + message + '</div></li>' );
            $('#messageList').append('<li id="' + msg_id +'" style="display: none;"><div class="alert in alert-block fade alert-warning"><a class="close" data-dismiss="alert">×</a>' + message + '</div></li>');
            showMessage(msg_id);
            return true;
        }
        return false;
    };

    this.info = function(message) {
        if (message) {
            var msg_id = 'msg' + Math.floor((Math.random()*1000000)+1);
            //$('#messageList').append(  '<li id="' + msg_id + '" style="display: none;" class="success roundedCorner"><div class="message"> ' + message + '</div></li>' );
            $('#messageList').append('<li id="' + msg_id +'" style="display: none;"><div class="alert in alert-block fade alert-info"><a class="close" data-dismiss="alert">×</a>' + message + '</div></li>');
            showMessage(msg_id);
            return true;
        }
        return false;
    };

    function showMessage(id)
    {
        var msg = $('#' + id);

        msg.slideDown('slow');

        msg.queue(function(){
            setTimeout(function(){
                msg.dequeue();
            }, 4500 );
        });

        msg.fadeOut('slow');
    }
};
