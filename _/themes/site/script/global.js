//Close button:
function goToByScroll(id){
    $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
}

$(function(){
    $('#myProfile').click(function() {
        $('#manuUser').fadeToggle('fast');
    });
});

function showAlert(data){

}