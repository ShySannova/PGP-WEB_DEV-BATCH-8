console.time();

//fetching elements
const slider = document.querySelector('.wrapper');
const image = document.querySelectorAll('.wrapper>li')
const buttons = document.querySelectorAll('.btn');
const indicators = document.querySelectorAll('.indicators>li');

let type = null; // used in onclick event
let control = 1; // used in direction changing mode


//used in prev/next functionality
let margin = -30;
let slideLeft = margin;
let count = 1;


//initialized to work with intervals
let autoSliderPrev;
let autoSliderNext;

//adding onclick event to make controls work
buttons.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        type = e.target.dataset.type;
        
        if (type==='prev') {
            prev();
            clearInterval(autoSliderNext);
            control = 0;
        };

        if(type==='next'){
            next();
            clearInterval(autoSliderPrev);
            control = 1;
        };
        
    });
});

//auto slider with direction changing mode
if (control===1) {
    //auto slider Next funstionality
    autoSliderNext = setInterval(() => {
        buttons.forEach((btn)=>{
            btn.setAttribute('disabled','')
        })
        next();
    }, 4000);
}else {
    //auto slider prev funstionality
    autoSliderPrev = setInterval(() => {
        buttons.forEach((btn)=>{
            btn.setAttribute('disabled','')
        })
        prev();
    }, 4000);
}


//reset slider Prev
function resetSliderPrev() {
    clearInterval(autoSliderPrev);
    autoSliderPrev = setInterval(() => {
            btnsDisabler();
            prev();
    }, 4000);
};

//reset slider Next
function resetSliderNext() {
    clearInterval(autoSliderNext);
    autoSliderNext = setInterval(() => {
            btnsDisabler();
            next();
    }, 4000);
};

//buttons Enabling Functionality
function btnsEnabler() {
    setTimeout(() => {
        buttons.forEach((btn)=>{
            btn.disabled = false;
        });
    }, 800);
};

//buttons Disabling Functionality
function btnsDisabler(){
    buttons.forEach((btn)=>{
        btn.setAttribute('disabled','')
    });
}

//prev functionality
function prev() {
    slider.style.transition = '.8s ease-in-out';
    slideLeft -= margin;
    slider.style.marginLeft = slideLeft + 'vw';
    btnsDisabler();
    count--;
    if(count!==0){
        indicators[count].classList.remove('active')
        indicators[count-1].classList.add('active');
    }
    if(count<1){
        setTimeout(() => {
            slider.style.transition = 'none'
            slideLeft = (margin)*(image.length-2);
            slider.style.marginLeft = slideLeft + 'vw';
            indicators[count].classList.remove('active');
            count=image.length-2;
            indicators[count-1].classList.add('active');
        }, 800);   
    };

    resetSliderPrev();

    btnsEnabler();

};


//prev functionality
function next() {
    slider.style.transition = '.8s ease-in-out';
    slideLeft += margin;
    slider.style.marginLeft = slideLeft + 'vw';
    if(count!==image.length-2){
        indicators[count-1].classList.remove('active');
        indicators[count].classList.add('active');
    }
    btnsDisabler();
    count++;
    if(count===image.length-1){
        setTimeout(() => {
            slider.style.transition = 'none'
            slideLeft = margin;
            slider.style.marginLeft = slideLeft + 'vw';
            indicators[count-2].classList.remove('active');
            count=1;
            indicators[count-1].classList.add('active');
        }, 800);
    };

    resetSliderNext();

    btnsEnabler()

};


console.timeEnd();
