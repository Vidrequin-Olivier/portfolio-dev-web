const darkThemeItemsList = 	[
	document.documentElement,
	document.body, 
	document.querySelector('header'),
	document.querySelector('.headerTitle'),
	document.querySelector('.burgerMenu'),
	document.querySelector('.menu'),
	document.querySelector('.themeToggleButton'),
	document.querySelector('.linearGradient'),
	document.querySelector('h1'), 
	...document.querySelectorAll('.contactButton')
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

function handleFormModal() {
	const modal = document.querySelector('.modal');
	const contactMe = document.querySelectorAll('.contactButton');
	const closeButton = document.querySelector('.closeModalButton');

	contactMe.forEach((el) => el.addEventListener('click', () => {
		modal.style.display = 'block';
	}));

	closeButton.addEventListener('click', () => {
		modal.style.display = 'none';
	});

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.style.display = 'none';
		};
	});
};

document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("qNPU3GxEySM8oVaZb");
  const modal = document.querySelector('.modal');
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    contactForm.checkValidity()
      ? await (async () => {
				try {
					await emailjs.sendForm("service_qi70w8b", "template_bfe5j8n", contactForm, "qNPU3GxEySM8oVaZb");
					alert("Votre message a bien été envoyé !");
					contactForm.reset();
					modal.style.display = 'none';
				} catch (error) {
					alert(
						error.text?.includes('rate limit')
							? "Le service de contact est temporairement indisponible. Merci de réessayer plus tard."
							: "Une erreur est survenue, veuillez réessayer."
					);
				}
			})()
      : contactForm.reportValidity();
  });
});

function toggleImages() {
  const sun = document.querySelector('.fa-sun');
  const moon = document.querySelector('.fa-moon');
  const gptLightTheme = document.querySelector('.gptLightTheme');
  const gptDarkTheme = document.querySelector('.gptDarkTheme');
	const themeColor = localStorage.getItem('theme')

  themeColor === 'dark'
    ? (sun.style.display = 'none',
			moon.style.display = 'block',
			gptDarkTheme.style.display = 'none',
			gptLightTheme.style.display = 'block')
    : (moon.style.display = 'none',
			sun.style.display = 'block',
			gptLightTheme.style.display = 'none',
			gptDarkTheme.style.display = 'block');
};

function toggleButtonListener() {
	darkThemeItemsList.forEach((el) => el ? el.classList.toggle('darkTheme') : null);

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

		currentTheme === 'light'
		? (sun.style.display = 'none',
			 moon.style.display = 'block',
			 gptLightTheme.style.display = 'block',
			 gptDarkTheme.style.display = 'none')
		: darkThemeItemsList.forEach((element) => element?.classList.add('darkTheme'));
			toggleButton.innerHTML = 'Basculer en<br>Thème clair';
			moon.style.display = 'none';
			sun.style.display = 'block';
			gptLightTheme.style.display = 'none';
			gptDarkTheme.style.display = 'block';
	};

function themeToggleButton() {
  const toggleButton = document.querySelector('.themeToggleButton');
	toggleButton.addEventListener('click', () => {
		toggleButtonListener();
  });
	handleTheme();
};

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

function main() {
	handleFormModal();
	themeToggleButton();
	showSlide(currentSlide);
	document.querySelector('.next').addEventListener('click', () => changeSlide(1));
	document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
};

main();