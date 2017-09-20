(function($){
    'use strict';
    if (window.jQuery === undefined) {
        return;
    }

var UploadPhotoFile = function(){
        this.$elTarget = undefined;
        this.imgArray = [];
        this.loadedImg = undefined;
        this.getElements();
        this.setEvents();
    }
    UploadPhotoFile.prototype = {
        getElements: function(){
            this.$el = $('#input_photo');
            this.$elBtn = this.$el.siblings('.c-rvwPostForm__fileInputBtn');
        },
        setEvents: function(){
            this.$elBtn.bind('click', {that:this}, this.uploadFile);
            this.$el.bind('change', {that:this}, this.outputUploadFiles);
        },
        uploadFile: function(e){
            e.preventDefault();
            var that = e.data.that;
            that.$el.trigger('click');
        },
        outputUploadFiles: function(e){
            var that = e.data.that;
            var compiled = _.template($("#uploadPhotoTemp").html());

            var fileNum = $(this)[0].files.length;
            if(!fileNum) return;

            $('.c-rvwPostForm__uploadedImgWrapper').remove();

            for(var i = 0; i < fileNum; i++){
                if($(this)[0].files[i].type.indexOf("image") < 0){
                    alert('uploaded non-image file!')
                    return false;
                }
                (function(file){
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL(file);

                    fileReader.onloadend = function(e){
                        that.loadedImg = e.target.result;
                        $("#userInfo").append(
                            compiled({
                                "img": that.loadedImg
                            })
                        );
                    }
                })($(this)[0].files[i]);
            }
        }
    }
    var uploadPhotoFile = new UploadPhotoFile();

})(jQuery);
