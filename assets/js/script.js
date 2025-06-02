'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () { 
  navbar.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () { 
  navbar.classList.remove("active");
  document.body.classList.remove("nav-active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * Smooth scroll for navigation links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * Animate elements on scroll
 */
const animateOnScroll = function() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    
    if(elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
}

window.addEventListener('scroll', animateOnScroll);

/**
 * Progress bar animation
 */
const animateProgressBars = function() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const value = bar.getAttribute('data-progress');
    bar.style.width = value + '%';
  });
}

// Run progress bar animation when elements are in view
const progressBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateProgressBars();
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-bg').forEach(bar => {
  progressBarObserver.observe(bar);
});

/**
 * Video player functionality
 */
const videoCard = document.querySelector('.video-card');
const playBtn = document.querySelector('.play-btn');

if (videoCard && playBtn) {
  playBtn.addEventListener('click', function() {
    videoCard.classList.add('playing');
    // Add your video player logic here
  });
}

/**
 * Form validation and animation
 */
const forms = document.querySelectorAll('form');

forms.forEach(form => {
  const inputs = form.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
  });
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    this.classList.add('submitted');
  });
});

/**
 * Initialize animations on page load
 */
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
  animateOnScroll();
});

/**
 * Feedback slider functionality
 */
const feedbackCards = document.querySelectorAll('.feedback-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showFeedback(index) {
  feedbackCards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  feedbackCards[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextFeedback() {
  currentIndex = (currentIndex + 1) % feedbackCards.length;
  showFeedback(currentIndex);
}

function prevFeedback() {
  currentIndex = (currentIndex - 1 + feedbackCards.length) % feedbackCards.length;
  showFeedback(currentIndex);
}

// Initialize the first feedback
showFeedback(0);

// Add event listeners
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevFeedback);
  nextBtn.addEventListener('click', nextFeedback);
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentIndex = index;
    showFeedback(currentIndex);
  });
});

// Auto-rotate feedback every 5 seconds
setInterval(nextFeedback, 5000);