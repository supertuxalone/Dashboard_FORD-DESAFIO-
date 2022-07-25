const imgs = document.getElementById("carouselExampleInterval");
const carouselExampleInterval = document.querySelectorAll("#carouselExampleInterval carouselExampleInterval");

let idx = 0;

function carousel(){
    idx++;

    if(idx > carouselExampleInterval.length -1){
        idx = 0;
    }

    imgs.style.transform = 'translateX(${-idx + 500}px)';
}

setInterval(carousel, 1600);
