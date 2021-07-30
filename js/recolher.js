var containers = document.querySelectorAll('.container');

containers.forEach(container => {
    container.addEventListener('click', function(){
        var desc = container.querySelector('.desc');
        // Fechado
        if(container.querySelector('i').style.top == "" || container.querySelector('i').style.top == "-3px"){
            desc.style.animation = "desce 0.4s";
            setTimeout(function(){
                desc.style.display = "block";
                container.querySelector('.titulo').style.borderRadius = "30px 30px 0 0";
                container.querySelector('i').style.transform = "rotate(-180deg)";
                container.querySelector('i').style.top = "4px";
            }, 200);
        }
        // Aberto
        else{
            desc.style.animation = "sobe 0.4s";
            setTimeout(function(){
                desc.style.display = "none";
                container.querySelector('.titulo').style.borderRadius = "30px";
                container.querySelector('i').style.transform = "rotate(0deg)";
                container.querySelector('i').style.top = "-3px";
            }, 200);
            
        }
    });
});