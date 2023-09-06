class ToggelLike{
    constructor(toggleElement){
        this.toggler=toggleElement
        this.toggelLike();
    }
   
      toggleLike()
      {
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self=this;
            $.ajax({
                type:'POST',
                url:$(self).attr('href')
            }).done(function(data){
                let likesCount=parseInt($(self).attr('data-likes'));
                console.log(likesCount)
                if(data.data.deleted==true)
                {
                    likesCount-=1;
                }else{
                    likesCount+=1;
                }
                $(self).attr('data-likes',likesCount);
                $(self).html(`$(likesCount) Likes`);
            })
            .fail(function(errdata)
            {
                console.log("Error in completing the request");
            });
        });
      }
}