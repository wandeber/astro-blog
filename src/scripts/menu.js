document.addEventListener('astro:page-load', function () {
	document.querySelector('.hamburger').addEventListener('click', function () {
		document.querySelector('.nav-links').classList.toggle('expanded');
	});
});
