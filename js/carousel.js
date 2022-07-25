

//carousel

//Array storage class
let carouselArr = [];

/* class Carousel
criação de classe, atributos e constructor*/
class Carousel {

    constructor(image, title, url) {
        this.image = image;
        this.title = title;
        this.url = url;
    }

    static Start(arr) {
        if (arr) {

            if (arr.length > 0) {
                Carousel._sequence = 0;
                Carousel._size = arr.length;
                Carousel.Next(); //start
                Carousel._interval = setInterval(function () {
                    Carousel.Next();
                }, 5000);
            }

        } else {
            throw "Method Start need a Array Variable.";
        }
    }

    //metodo responsavel por exebir o conteudo na tela
    static Next() {

        //verifica se o numero de sequencia atual é maior que contador, se for reseta
        if (this._sequence >= this._size) {
            this._sequence = 0;
        } 

       this.carouselTitulo();
       this.carouselImg(); 
        //contador para a proxima imagem
        this._sequence += 1;
    }

    static carouselImg() {
        this.carouselImgLk();
        let carouselImg = document.getElementById("carousel-image");
        carouselImg.src = "../JavaScript-DESAFIO-versao001/img/" + carouselArr[this._sequence].image;
    }
    static carouselImgLk() {
        let imageLk = document.getElementById("carousel-image-link");
        imageLk.href = carouselArr[this._sequence].url;
    }
    static carouselTitulo() {
        let titulo = document.getElementById("carousel-title-link");
        let content = carouselArr[this._sequence];
        titulo.textContent = content.title;
        titulo.href = content.url;
    }

};
