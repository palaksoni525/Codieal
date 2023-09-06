{
    let createPost=function()
    {
        let newPostForm=$('#post-form');
        newPostForm.submit(function(e)
        {
             e.preventDefault();

             $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data)
                {
                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);  
                    deletePost($('.delete-button',newPost));
                },
                error:function(error)
                {
                    console.log(error.responseText);
                }
             });
        });
    }
}

//method to create a post in dom
        let newPostDom=function()  {
            return $(` <li class="unordered-list" id="post-${post._id}">
            <p>
           
               <small class="delete-box">
                  <a href="/posts/destroy/${post._id}" class="delete-button" id="delete-post-button"> Delete  Post</a>
               </small>
                   <br>
                     ${post.content }
                     <br>
                     -Posted by
                   <small>
                      ${post.user.name }
                      
                   </small>
                   <br>
                    <small>


                        <a href="/likes/toggle/?id=<%=post._id%>&type=Post">  0Like</a>
                      
                    </small>
            </p>        
         
         
         <div class="post-comments">
         
             <form action="/comments/create" method="POST" >
                <input type="text" name="content" placeholder="type here to add comment ..." required>
                <input type="hidden" name="post" value="${post._id}">
                 <button type="submit">
                    Add Comment
                </button>
               </form>
          
            
          <div id="post-comments-list">
            <ul id="post-comments-${post.id }">
               
            </ul>
         
         </div>
         </div>
                  
          
         </li>
         `)
    }  
    let deletePost=function(deleteLink)
    {
         $ (deleteLink).click(function(e)
         {  e.preventDefault();
              $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data)
                {  $(`#posts-${data.data.post_id}`).remove();

                },error: function(error)
                {    console.log(error.responseText);

                }
              })

         });
    }
    createPost();
