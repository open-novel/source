/**
ES5
*/

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js');
}
window.addEventListener("hashchange", function() {

});
window.addEventListener("DOMContentLoaded", function() {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach( el => {
			el.addEventListener('click', () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active');
				$target.classList.toggle('is-active');

			});
		});
	}
	const sectionTitles = [];
	querySelectorAll('*[role="tab"]');
	querySelectorAll('*[role="tabpanel"]');
	for(let x of document.querySelectorAll('#navMenu a')) {
		sectionTitles.push(x.getAttribute('href').substring(1));
	}
	var  hash = document.location.hash;
	if(hash) {
		var array = decodeURI(hash.slice(1)).split('/');
		var index = -1;
		$.each(sectionTitles, function(i,n) {
			if(n === array[0]) {
				index = i;
				return;
			}
		});
	}
	var  app = new Vue({
		el:"#app",
		data: vueData,
		mounted: function(){
			
		},
		computed: {
			
		},
		methods: {
			enlarge: function(me) {
				var  target = me.target;
				var  top = me.pageY - target.naturalHeight/2 > 0 ? me.pageY - target.naturalHeight/2 : 0;
				var  width = window.innerWidth > me.target.naturalWidth ? me.target.naturalWidth : window.innerWidth;
				$('body')
				.append(
					$('<div id="image-panel"></div>')
					.css({
						position: 'absolute',
						top: top,
						width: '100%',
						"z-index": 30
					}).append($('<div id="image"></div>')
						.append($('<img>').attr({
							src: target.getAttribute("src"),
							width: width
						}))
					).append($('<button id="close-button">閉じる</button>')
						.click(function() {
							$('#image-panel').remove();
						})
					)
				);
			},
			selectTab: function(index, me) {
				this.panes[index] = me.target.innerText;
				//再描画に必要
				this.pane = me.target.innerText;
				this.showMenu = false;
			}
		},
	});
});
