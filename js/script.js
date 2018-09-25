
    function displayAll()
    {
      $(".building").removeClass("hide").addClass("show")
      $(".cars").removeClass("hide").addClass("show")
      $(".nature").removeClass("hide").addClass("show")
      $(".fashio").removeClass("hide").addClass("show")
    }

    function building()
    {
      $(".building").removeClass("hide").addClass("show")
      $(".cars").removeClass("show").addClass("hide")
      $(".nature").removeClass("show").addClass("hide")
      $(".fashion").removeClass("show").addClass("hide")
    }

    function cars()
    {
      $(".building").removeClass("show").addClass("hide")
      $(".cars").removeClass("hide").addClass("show")
      $(".nature").removeClass("show").addClass("hide")
      $(".fashion").removeClass("show").addClass("hide")
    }

    function nature()
    {
      $(".building").removeClass("show").addClass("hide")
      $(".cars").removeClass("show").addClass("hide")
      $(".nature").removeClass("hide").addClass("show")
      $(".fashion").removeClass("show").addClass("hide")
    }

    function fashion()
    {
      $(".building").removeClass("show").addClass("hide")
      $(".cars").removeClass("show").addClass("hide")
      $(".nature").removeClass("show").addClass("hide")
      $(".fashion").removeClass("hide").addClass("show")
    }

    function displayForm()
      {
        $(".imageForm").css("display","block")
      }

    const url="http://localhost:3000/images";
    let $url = $('#url')
    let $title = $("#title");
    let $desc = $("#desc");
    let $date = $("#date");
    let $categorie=$("#categorie")

     

 
      
    function imageShow(image)
    {
        let gallery = $("#galleryImages");
        const imageHtml = $("<div>").addClass(`${image.categorie} show p-0`).attr("id",image.id)
        .append([
          $("<img>").attr("src",image.url).attr("alt","GalleryImage").attr("height","200px").addClass("image")
        ])
        gallery=gallery.append(imageHtml)
    }

    function afterActions()
    {
      $title.val("")
      $url.val("")
      $date.val("")
      $desc.val("")
      $categorie.val("")
      $(".cancelEdit").remove()
      $(".edit").remove()
      $(".delete").remove()
      $('.upload').css('display','block')
      $(".imageForm").css("display","none")
    }

    (function () 
    {
      return fetch(url)
             .then(res => res.json())
             .then(respponse => 
              {    
                respponse.forEach(image => 
                {
                 imageShow(image)
                })
              })
             .catch(error => alert('please run server'))
    }())

    function upload()
    {
        let input = 
        {
          title: $title.val(),
          url: $url.val(),
          date: $date.val(),
          descreption:$desc.val(),
          categorie:$categorie.val()
        }

        axios.post(url, input)
        .then(res => 
          {
          imageShow(res.data);
          })
        afterActions()
      }

    $(".row").on('click', '.show', function() 
    {
      $(".imageForm").css("display","block")
      $('.upload').css('display','none')
      let currentImage = $(this).closest('.show');
      let currentImageId = currentImage.attr("id");
      const urlId = url + '/' + currentImageId;

      fetch(url)
      .then(res => res.json())
      .then(respponse => 
        {    
         respponse.forEach(image => 
          {
            if(image.id==currentImageId)
            {
              $($url).val(image.url)
              $($title).val(image.title) 
              $($date).val(image.date)
              $($categorie).val(image.categorie) 
              $($desc).val(image.descreption) 
            }
          })
        })

      $(".imageForm").append(
      [
        $("<button>").attr("type","button").addClass("btn btn-primary mr-2 edit").html("Edit")
        .on( 'click', function () 
        { 
          let update=
          {
              title: $title.val(),
              url: $url.val(),
              date: $date.val(),
              descreption:$desc.val(),
              categorie:$categorie.val()
          }
          axios.put(urlId,update)
          afterActions()
        }),

        $("<button>").attr("type","button").addClass("btn btn-warning ml-2 cancelEdit").html("Cancel")
        .on( 'click', function () 
        {
          afterActions()
        }),

        $("<button>").attr("type","button").addClass("btn btn-danger ml-2 delete").html("Delete")
           .on( 'click', function () 
           {
               axios.delete(urlId)
               .then(res => 
                {
                 currentImage.remove()
                })
                afterActions()
            })
      ])
    })

    // script for Slide Show Page

    let currentImageId=0;
    function slide()
    {
            fetch(url)
            .then(res => res.json())
            .then(respponse => {    
                respponse.forEach(image => 
                {
                   if(image.id==currentImageId)
                   {
                       $(".slideImage").attr("src",image.url)
                       $(".slideTitle").html(image.title)
                       $(".slideDate").html("Captured on "+image.date)
                       $(".slideDesc").html(image.descreption)
                   }
                 })
            })
    }

    $(".row").on('click', '.show', function() 
    {
        $("#slideShow").css("display","block")
        let currentImage = $(this).closest('.show');
        currentImageId = currentImage.attr("id");
        slide()
    })
    function next()
    {
        currentImageId++;
        slide()
    }

    function prev()
    {
        currentImageId--;
        slide()
    }

    function autoSlide()
    {
       setInterval(next,3000) 
    }