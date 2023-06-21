
// Skills Section skills selector
var options = document.getElementsByClassName("options");
var optioncontents = document.getElementsByClassName("option-contents");

function opentab(tabname){
    
    for(option of options){
        option.classList.remove("active-option");
    }

    for(optioncontent of optioncontents){
        optioncontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-option");
    document.getElementById(tabname).classList.add("active-tab");
}


// Projects Section project click and drag scroller
const slider = document.querySelector(".projects-slider");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    e.preventDefault(); // prevents default click and drag browser functions (like grabbing an image)
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    console.log(startX);
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; // stop the function from running unprovoked
    e.preventDefault(); // prevents default click and drag browser functions (like grabbing an image)
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});



// Intersection Observer (for playing anims when element is in view)

// Create the observer
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const header = entry.target.querySelector(".animate");
        header.classList.remove("pop");
        if (entry.isIntersecting) {
            // It's visible. Add the animation class here!
            header.classList.add("pop");
        }

        
    });
});

// Tell the observer which elements to track
const wrapperList = document.querySelectorAll(".wrapper");
wrapperList.forEach((wrapper) =>{
    observer.observe(wrapper);
});



// Contact Form submission to Google Sheets
window.addEventListener("load", function() {
    const form = document.getElementById('contact-form');
    const msg = document.getElementById('success-msg');
    const submit = document.getElementById('submit-button');
    const loading = document.getElementById('lds-ring');
    form.addEventListener("submit", function(e) {
      submit.classList.add("hide");
      loading.classList.remove("hide");
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        submit.classList.remove("hide");
        loading.classList.add("hide");
        msg.classList.add("pop");
        msg.innerHTML = "Success!";
        setTimeout(function(){
            msg.classList.add("fade-out");
        }, 8000)
        
        setTimeout(function(){
            msg.classList.remove("fade-out");
            msg.classList.remove("pop");
            msg.innerHTML = "";
        }, 8500)
        
      })
      form.reset();
    });
});