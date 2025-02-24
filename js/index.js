const darkThemeItemsList = 	[ 
	document.body, 
	document.querySelector('header'),
	document.querySelector('.headerTitle'),
	document.querySelector('.burgerMenu'),
	document.querySelector('.menu'),
	document.querySelector('.themeToggleButton'),
	document.querySelector('.linearGradient'),
	document.querySelector('h1'), 
	...document.querySelectorAll('.contactMe')
];

let slideAnimation = false;

document.addEventListener('DOMContentLoaded', () => {
  const burgerButton = document.querySelector('.burgerButton');
  const menu = document.querySelector('.menu');
	const lines = burgerButton.querySelectorAll('.line');

  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('open');
    menu.classList.toggle('visible');
  });

  burgerButton.addEventListener('mouseenter', () => {
    lines.forEach(line => {
      line.style.backgroundColor = '#f5f5f5';
    });
  });

  burgerButton.addEventListener('mouseleave', () => {
    lines.forEach(line => {
      line.style.backgroundColor ='dimgrey';
    });
  });
});


function toggleImages() {
	const sun = document.querySelector('.fa-sun');
	const moon = document.querySelector('.fa-moon');
	const gptLightTheme = document.querySelector('.gptLightTheme');
	const gptDarkTheme = document.querySelector('.gptDarkTheme');

  if (gptLightTheme.style.display === 'block') {
    moon.style.display = 'none';
    sun.style.display = 'block';
    gptLightTheme.style.display = 'none';
    gptDarkTheme.style.display = 'block';
  } else {
    sun.style.display = 'none';
    moon.style.display = 'block';
    gptDarkTheme.style.display = 'none';
    gptLightTheme.style.display = 'block';
  };
};

function toggleButtonListener() {
	darkThemeItemsList.forEach((element) => {
		if (element) {
			element.classList.toggle('darkTheme');
		};
	});

	toggleImages();
	
	const newTheme = document.body.classList.contains('darkTheme') ? 'dark' : 'light';
  const toggleButton = document.querySelector('.themeToggleButton');
	toggleButton.innerHTML = newTheme === 'dark' ? 'Basculer en<br>Thème clair' : 'Basculer en<br>Thème sombre';
	localStorage.setItem('theme', newTheme);
};

function handleTheme() {
  const toggleButton = document.querySelector('.themeToggleButton');
  const currentTheme = localStorage.getItem('theme') || 'light';
	const sun = document.querySelector('.fa-sun');
	const moon = document.querySelector('.fa-moon');
	const gptLightTheme = document.querySelector('.gptLightTheme');
	const gptDarkTheme = document.querySelector('.gptDarkTheme');

	if (currentTheme === 'light') {
		sun.style.display = 'none';
    moon.style.display = 'block';
		gptLightTheme.style.display = 'block';
		gptDarkTheme.style.display = 'none';
  } else {
		darkThemeItemsList.forEach((element) => {
			if (element) {
				element.classList.add('darkTheme');
			};
		});
    toggleButton.innerHTML = 'Basculer en<br>Thème clair';
    moon.style.display = 'none';
    sun.style.display = 'block';
		gptLightTheme.style.display = 'none';
		gptDarkTheme.style.display = 'block';
	}
};

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.themeToggleButton');
	toggleButton.addEventListener('click', () => {
		toggleButtonListener();
  });
	handleTheme();
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
	if (slideAnimation) return;
	slideAnimation = true;
	const timeout = 350;
	slides.forEach((slide, i) => {
		if (slide.classList.contains('active') && i !== index) {
			slide.style.transition = 'opacity var(--transitionDuration)';
			slide.style.opacity = 0;
			setTimeout(() => {
				slide.classList.remove('active');
			}, timeout);
		};

		setTimeout(() => {
			if (i === index) {
				slide.classList.add('active');
				slide.style.opacity = 0;
				slide.style.transition = 'opacity var(--transitionDuration)';
				setTimeout(() => {
					slide.style.opacity = 1;
				}, 50);
			};
			slideAnimation = false;
		}, timeout);
	});
};

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    } else if (currentSlide >= slides.length) {
        currentSlide = 0;
    };
    showSlide(currentSlide);
};

showSlide(currentSlide);
