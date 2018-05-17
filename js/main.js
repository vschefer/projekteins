
    let selectDesign = document.querySelector('.select-design');
    let selectDesignOptionWrapper = document.querySelector('.select-design__option-wrapper');
    let options = document.querySelectorAll('.select-design__option-wrapper span')
    selectDesign.addEventListener('click', function(e){
        selectDesignOptionWrapper.classList.toggle('active')
    })
    options.forEach(function(option){

        option.addEventListener('click', function(e){
            let optionDesign = option.innerText
            let bodyDesign = option.getAttribute('value')
            option.classList.add('active')
            document.querySelector('.select-design p').innerText = optionDesign
            document.querySelector('body').classList = ''
            document.querySelector('body').classList.add(bodyDesign)
        })
    })

    let newNoticeButton = document.querySelector('.header__create-button')
    let modal = document.querySelector('.modal-overlay')
    let closeButton = document.querySelector('.modal-overlay__close')
    let overlay = document.querySelector('.modal-overlay .overlay')
    newNoticeButton.addEventListener('click', function(){
        modal.classList.add("open")
    })
    closeButton.addEventListener('click', function (){
        modal.classList.remove("open")
    })

    overlay.addEventListener('click', function(){
        modal.classList.remove("open")
    })


    let importantStars = document.querySelectorAll('.create-notice__important-button')
    /*
    importantStars.forEach(function(star){
    star.addEventListener('click', function(){

        if(importantStars.children.classList.contains('important')){
            star.classList.remove('important')
        }
            star.classList.add('important')

    })
    }) */

    for(let i =0; i < importantStars.length; i++){

        importantStars[i].addEventListener('click', function(){
            if( importantStars[i].classList.contains('important')){
                importantStars[i].classList.remove('important')
            }else{
                importantStars[i].classList.add('important')
            }


        })
    }

    let input = document.querySelectorAll('.modal-overlay input')

    document.querySelector(".modal-overlay input,.modal-overlay textarea").addEventListener("blur",function(t){
        var e = t.target;
        console.log(onkeydown)
        ""!=e.value?e.classList.add("input-is-filled"):e.classList.remove("input-is-filled")})


   let button = document.querySelector('.modal-overlay button')
    button.addEventListener('click', function(){
        if(input.value == '' && input.classList.contains('filled')){
            console.log("fewf")
            input.classList.remove('filled')
        } else {
            console.log("add")
            input.classList.add('filled')
        }

    })
