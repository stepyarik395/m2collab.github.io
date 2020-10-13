window.addEventListener('load', function () {
  init();
});

function init() {
  const loader = document.querySelector('.loader');
  gsap.set(loader, {
    scaleX: 0,
    rotation: 10,
    xPercent: -5,
    yPercent: -50,
    transformOrigin: 'left center',
    autoAlpha: 1,
  });

  function loaderIn() {
    return gsap.fromTo(
      loader,
      {
        rotation: 10,
        scaleX: 0,
        xPercent: -5,
      },
      {
        duration: 0.8,
        xPercent: 0,
        scaleX: 1,
        rotation: 0,
        ease: 'Power4.inOut',
        transformOrigin: 'left center',
      }
    );
  }

  function loaderAway() {
    let animpage = document.querySelectorAll('main');
    gsap.from(animpage, { duration: 2, opacity: 0, y: 100 });

    return gsap.to(loader, {
      duration: 0.8,
      scaleX: 0,
      xPercent: 5,
      rotation: -10,
      transformOrigin: 'right center',
      ease: 'Power4.inOut',
    });
  }

  barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning');
    barba.wrapper.classList.add('is-animating');
  });

  barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning');
    barba.wrapper.classList.remove('is-animating');
    $('.section1__button').click(function () {
      $('.section1').fadeOut(200);
      setTimeout(() => {
        $('.section1_2').css({
          display: 'flex',
        });
        $('.section1_2').fadeIn(200);
      }, 300);
    });
    $('#page-school-vacancies').click(function () {
      $('.page__school').fadeOut(200);
      setTimeout(() => {
        $('.page__school1_2').fadeIn(200);
      }, 500);
    });

    $('.page__news__wrapper')
      .add('.page__shares__slider')
      .slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: `<svg width="54" class="slick-next" height="26" viewBox="0 0 76 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.5765 0.391039C59.9099 -0.130346 58.8605 -0.130346 58.194 0.391039C57.5499 0.894811 57.5499 1.73326 58.194 2.23585L70.2746 11.6854H2.59817C1.66889 11.6854 0.90625 12.2631 0.90625 12.99C0.90625 13.7169 1.66889 14.3134 2.59817 14.3134H70.2746L58.194 23.7454C57.5499 24.2667 57.5499 25.1064 58.194 25.609C58.8605 26.1303 59.9099 26.1303 60.5765 25.609L75.517 13.9224C76.161 13.4186 76.161 12.5802 75.517 12.0776L60.5765 0.391039Z" fill="white"/>
    </svg>
    `,
        prevArrow: `<svg width="54" class="slick-prev" height="18" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0911 0.270719C11.5704 -0.0902398 12.325 -0.0902398 12.8043 0.270719C13.2675 0.619484 13.2675 1.19995 12.8043 1.5479L4.11715 8.08988H52.7833C53.4516 8.08988 54 8.48986 54 8.99309C54 9.49632 53.4516 9.90931 52.7833 9.90931H4.11715L12.8043 16.4391C13.2675 16.8001 13.2675 17.3813 12.8043 17.7293C12.325 18.0902 11.5704 18.0902 11.0911 17.7293L0.347347 9.63859C-0.115782 9.28982 -0.115782 8.70936 0.347347 8.36141L11.0911 0.270719Z" fill="white"/>
    </svg>
    `,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    const accessToken =
      'UBTiMB645m7GWLc1BS9Jv0jUg6yu5foP3zA0N9VmJVXRaiSJLy3GLw5pgBXxj69o';
    const map = L.map('map').setView([47.843315, 35.122781], 22);

    const styles = [
      'jawg-streets',
      'jawg-sunny',
      'jawg-terrain',
      'jawg-dark',
      'jawg-light',
    ];
    const baselayers = {};
    styles.forEach(
      (style) =>
        (baselayers[style] = L.tileLayer(
          `https://tile.jawg.io/${style}/{z}/{x}/{y}.png?access-token=${accessToken}`,
          {
            attribution:
              '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
          }
        ))
    );

    baselayers['jawg-dark'].addTo(map);

    L.control.layers(baselayers).addTo(map);
    L.marker([47.843315, 35.122781], {
      icon: L.icon({
        iconUrl: 'assets/img/index-map.svg',
        iconSize: [30, 30],
      }),
    }).addTo(map);
  });

  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });

  barba.init({
    transitions: [
      {
        async leave() {
          await loaderIn();
        },
        enter() {
          loaderAway();
        },
      },
    ],
  });
}
$('.burger').click(function () {
  $(this).toggleClass('open');
  if ($(this).hasClass('open')) {
    $('.mob-menu').css({ display: 'flex' });
    $('.mob-menu').fadeIn();
  } else {
    $('.mob-menu').fadeOut();
  }
});

$('.mob-menu-item').click(function () {
  $('.mob-menu').fadeOut();
  $('.burger').removeClass('open');
});
$('.section1__button').click(function () {
  $('.section1').fadeOut(500);
  setTimeout(() => {
    $('.section1_2').css({
      display: 'flex',
    });
    $('.section1_2').fadeIn(500);
  }, 500);
});
$('#page-school-vacancies').click(function () {
  $('.page__school').fadeOut(200);
  setTimeout(() => {
    $('.page__school1_2').fadeIn();
  }, 500);
});
$('.page__news__wrapper')
  .add('.page__shares__slider')
  .slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: `<svg width="54" class="slick-next" height="26" viewBox="0 0 76 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M60.5765 0.391039C59.9099 -0.130346 58.8605 -0.130346 58.194 0.391039C57.5499 0.894811 57.5499 1.73326 58.194 2.23585L70.2746 11.6854H2.59817C1.66889 11.6854 0.90625 12.2631 0.90625 12.99C0.90625 13.7169 1.66889 14.3134 2.59817 14.3134H70.2746L58.194 23.7454C57.5499 24.2667 57.5499 25.1064 58.194 25.609C58.8605 26.1303 59.9099 26.1303 60.5765 25.609L75.517 13.9224C76.161 13.4186 76.161 12.5802 75.517 12.0776L60.5765 0.391039Z" fill="white"/>
</svg>
`,
    prevArrow: `<svg width="54" class="slick-prev" height="18" viewBox="0 0 54 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.0911 0.270719C11.5704 -0.0902398 12.325 -0.0902398 12.8043 0.270719C13.2675 0.619484 13.2675 1.19995 12.8043 1.5479L4.11715 8.08988H52.7833C53.4516 8.08988 54 8.48986 54 8.99309C54 9.49632 53.4516 9.90931 52.7833 9.90931H4.11715L12.8043 16.4391C13.2675 16.8001 13.2675 17.3813 12.8043 17.7293C12.325 18.0902 11.5704 18.0902 11.0911 17.7293L0.347347 9.63859C-0.115782 9.28982 -0.115782 8.70936 0.347347 8.36141L11.0911 0.270719Z" fill="white"/>
</svg>
`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

const accessToken =
  'UBTiMB645m7GWLc1BS9Jv0jUg6yu5foP3zA0N9VmJVXRaiSJLy3GLw5pgBXxj69o';
const map = L.map('map').setView([47.843315, 35.122781], 22);

const styles = [
  'jawg-streets',
  'jawg-sunny',
  'jawg-terrain',
  'jawg-dark',
  'jawg-light',
];
const baselayers = {};
styles.forEach(
  (style) =>
    (baselayers[style] = L.tileLayer(
      `https://tile.jawg.io/${style}/{z}/{x}/{y}.png?access-token=${accessToken}`,
      {
        attribution:
          '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
      }
    ))
);

baselayers['jawg-dark'].addTo(map);

L.control.layers(baselayers).addTo(map);
L.marker([47.843315, 35.122781], {
  icon: L.icon({
    iconUrl: '/assets/img/index-map.svg',
    iconSize: [30, 30],
  }),
}).addTo(map);
