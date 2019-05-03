class Slider{
    constructor(
        id,
        sliderWidth,
        sliderheight,
        lista_elementos,
        navegador,
        estilo_navegador,
        paginador,
        estilo_paginador,
        tiempo_animacion,
        estilo_animacion,
        auto,
    ){
        this.id = id;
        this.sliderWidth = sliderWidth;
        this.sliderheight = sliderheight;
        this.lista_elementos = lista_elementos;
        this.navegador = navegador;
        this.estilo_navegador = estilo_navegador
        this.paginador = paginador;
        this.estilo_paginador = estilo_paginador;
        this.tiempo_animacion = tiempo_animacion;
        this.estilo_animacion = estilo_animacion;
        this.auto = auto;

        this.imageIdx = 0;
        this.sliderInterval = 0;

        this.setUpActions();
    }

    setUpActions(){
        console.log('Setup is on the way');
        this.setSliderDimentions();
        this.setSliderNav();
        this.setSliderImages();
        this.setSliderEvents();
        //this.setIntervalAuto();
    }

    setSliderDimentions(){
        let sliderCanvas = document.querySelector(`#${this.id}`);
        //TAREA2: GUARDAR ALTO Y ANCHO
        sliderCanvas.setAttribute('style', `width: ${this.sliderWidth}px; height: ${this.sliderheight}px;`);
        console.log(sliderCanvas);
    }

    setSliderNav(){
        //document.createElement
        //appendChild

        if(this.lista_elementos.length > 1){
            //colocar flechas de navegación
            document.querySelector(`#${this.id} .slider-nav`).style.display = 'block';
        }
        //TAREA1: DINAMIZAR EL TAMAÑO DEL CONTENEDOR
        let sliderCanvasInner = document.querySelector(`#${this.id} .slider-inner`);
        sliderCanvasInner.setAttribute('style', `width: ${this.sliderWidth*this.lista_elementos.length}px`);
    }

    setSliderImages(){
        console.log('qty: ', this.lista_elementos);

        this.lista_elementos.forEach( (Image ) => {
            let currentImage = document.createElement("IMG");
            currentImage.setAttribute("src", Image);
            currentImage.setAttribute("width", "780");
            currentImage.setAttribute("height", "500");
            document.querySelector(`#${this.id} .slider-inner`).appendChild(currentImage);
        });
    }

    setSliderEvents(){
        //TAREA3: ESTABLECER CLICK  AL BOTON IZQUIERDO - COMPLETADO
        //TAREA4: VALIDAR EL FINAL DE LAS IMAGENES - COMPLETADO
        document.querySelector(`#${this.id} .slider-nav-prev`).addEventListener('click', () => {
            document.querySelector(`#${this.id} .slider-inner`).setAttribute('style', `left: -${(this.imageIdx -= 1) * 780}px`);

            if (this.imageIdx == -1) {
                this.lista_elementos.forEach( (e, index) => {
                    if (this.lista_elementos.length - 1 == index) {
                        let indexFinal = index;
                        let validacion = this.imageIdx;
                        this.imageIdx = indexFinal;
                        console.log(validacion);
                        document.querySelector(`#${this.id} .slider-inner`).setAttribute('style', `left: ${(validacion * indexFinal) * 780}px`);
                    };
                });
            };
        });
        
        //definir click en boton derecho
        document.querySelector(`#${this.id} .slider-nav-next`).addEventListener('click', () => {
            console.log('HIT NEXT!!!!');
            document.querySelector(`#${this.id} .slider-inner`).setAttribute('style', `left: -${(this.imageIdx += 1) * 780}px`);

            if (this.imageIdx == this.lista_elementos.length) {
                this.lista_elementos.forEach( (e, index) => {
                    if (0  == index) {
                        let indexInicial = index;
                        let validacion = this.imageIdx;
                        this.imageIdx = indexInicial;
                        console.log(validacion);
                        document.querySelector(`#${this.id} .slider-inner`).setAttribute('style', `left: ${(validacion * indexInicial) * 780}px`);
                    };
                });
            };
        });


        this.lista_elementos.forEach( (e, index) => {
            console.log(index);

            let buttonPager = document.createElement("BUTTON");
            document.querySelector(`#${this.id} .slider-pager`).appendChild(buttonPager);
            buttonPager.id = `pager-btn${index}`;

            let btnAttr = document.createAttribute("class");
            btnAttr.value = 'slider-pager-btn';
            buttonPager.setAttributeNode(btnAttr);

            let i = document.createElement("i");
            let attr = document.createAttribute("class");
            attr.value = "far fa-dot-circle";
            i.setAttributeNode(attr);
            buttonPager.appendChild(i);

            // let t = document.createTextNode(`img/ww2_${index}.jpg`)
            // i.appendChild(t);

            let btnId = document.querySelector(`#pager-btn${index}`);
            btnId.style.left = `${(index+1) * 22}%`; //ALGO TEMPORAL

            btnId.addEventListener('click', () => {
                //console.log(index);
                let sliderWidthParse = parseInt(this.sliderWidth);
                let goImage = sliderWidthParse * index;
                document.querySelector(`#${this.id} .slider-inner`).setAttribute(`style`, `left: -${goImage}px`);
            });
        });

        if (this.auto) {
            
            let sliderInner = document.querySelector(`#${this.id} .slider-inner`);
            let interval = setInterval(function () {
                if (this.imageIdx == 0) {
                    console.log('next');
                    sliderInner.style.left += `-${this.sliderWidth}px`;
                }
            }.bind(this), 1000);
            


        //     let sliderInner = document.querySelector(`#${this.id} .slider-inner`)
        //     sliderInner.addEventListener('mouseover', function(evento){
        //         setTimeout(function(){
        //             evento.target.style.left -= `-${this.sliderWidth}px`;
        //         }, 2000)
        //     });
        }
        
    }

    // setIntervalAuto(){

    //     if(this.auto){
    //         this.sliderInterval = setInterval( 
    //             function(){
    //                 this.setSliderInnerPosition(this.imageIdx+=1);
    //         }.bind(this)
    //         ,2000);
    //     }
    // }

    //TAREA5: HACERLO AUTOMATICO SI FUERA EXPLICITO.
    //TAREA6: ESTABLECER EL PAGINADOR INFERIOR.
    //TAREA7: ESTABLECER EL CLICK A CADA BOTONCITO DEL PAGINADOR.

    getImprimirInfo(){
        console.log(this.lista_elementos, 
                    this.navegador, 
                    this.estilo_navegador,
                    this.paginador, 
                    this.estilo_paginador, 
                    this.tiempo_animacion,
                    this.estilo_animacion, 
                    this.auto)
    }
}

let sliderPrincipal = new Slider(
    'slider-principal', 
    '780',
    '500',
    ['img/ww2_01.jpg', 
    'img/ww2_02.jpg', 
    'img/ww2_03.jpg'], 
    true, 
    'square', 
    true, 
    'square', 
    0.5, 
    'linear', 
    true);
