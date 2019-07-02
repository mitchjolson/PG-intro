$(document).ready(onReady);

function onReady(){
    console.log( 'jQuery loaded' );
    getAllMusic();
}

function getAllMusic(){
    $.ajax({
        method: 'GET',
        url: '/music'
    }).then( function(response){
        console.log('back from server ', response)
    }).catch (function (error) {
        console.log('Failed', error);
    })
}