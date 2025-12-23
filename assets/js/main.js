(function () {
  "use strict";

  /**
   * Header toggle
   */

  const headerToggleBtn = document.querySelector('.header-toggle');
  const navLinks = document.querySelector('.nav-links');

  function headerToggle() {
    navLinks.classList.toggle('active');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }



  headerToggleBtn.addEventListener('click', headerToggle);

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        headerToggle();
      }
    });
  });

  // Add background to header on scroll
  // window.addEventListener('scroll', function() {
  //   const header = document.querySelector('.header');
  //   if (window.scrollY > 50) {
  //     header.style.backgroundColor = 'rgba(18, 18, 18, 1)';
  //   } else {
  //     header.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
  //   }
  // });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function (direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.counter');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let count = 0;

            const duration = 800;
            const interval = Math.floor(duration / target);

            const timer = setInterval(() => {
              count++;
              counter.innerText = count;
              if (count >= target) {
                clearInterval(timer);
              }
            }, interval);
          });

          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.row.justify-content-center.gx-4.gx-md-5');
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  });
  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


emailjs.init('gvF9xjR5um_3_q3rE');

document.getElementById('cfContactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.cf_submit_btn');
    const originalText = submitBtn.textContent;
    const formData = new FormData(this);
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const templateParams = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Karachi',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }) + ' PKT'
    };

    emailjs.send('service_oq3wb9s', 'template_m9ob3z9', templateParams)
        .then(response => {
            showToast('Message sent successfully!', 'success');
            this.reset();
        })
        .catch(error => {
            showToast('Failed to send the message.', 'error');
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
});
function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.cf_toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `cf_toast cf_toast_${type}`;

    toast.innerHTML = message;
    const formWrapper = document.querySelector('.cf_form_wrapper');
    formWrapper.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('cf_toast_show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('cf_toast_show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }, 4000);
}
const cfInputs = document.querySelectorAll('.cf_form_input, .cf_form_textarea');
cfInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

  document.getElementById('downloadButton').addEventListener('click', function () {
    window.open('./assets/files/Asjad_Farooq_CV.pdf', '_blank');
});
})();