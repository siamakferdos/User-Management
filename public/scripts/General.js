function readImage(uploader) {
    if ( uploader.files && uploader.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
             //el("img").src = e.target.result;
             return e.target.result;
        };       
        FR.readAsDataURL( uploader.files[0] );
    }
}
