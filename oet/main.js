/**
ES5
*/
var DEFAULT_PANES = ['ようこそ','応分'];
var vueData = {
		character: {
			name:null,
			ruby:null,
			images:[],
			desc:null
		},
		panes: ['ようこそ','応分'],
		pane: '',
		story: {
			name:null,
			characters:[],
			summary:null,
			path:null,
			desc:null
		},
		ss: {
			name:null,
			characters:[],
			content:null
		}
}
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
		if(index !== -1) {
			vueData.panes[0] = sectionTitles[index];
			for(var i = 0; i < array.length; i++) {
				vueData.panes[i] = array[i];
			}
		}
	}
	var  app = new Vue({
		el:"#app",
		data: vueData,
		mounted: function(){
			
		},
		computed: {
			
		},
		methods: {
			fetchCharacter: function(me) {
				var character = me.target.innerText;
				$.ajax({
					type: 'GET',
					url: 'character/'+character+'.html',
					dataType: 'xml',
					success: function(data, textStatus) {
						var dom = $(data);
						app.character.desc = $('<div></div>').append(dom.find('#description').children()).html();
						app.character.name = dom.find('title').text();
						app.character.ruby = dom.find('#ruby').text();
						app.character.images = [];
						dom
						.find('#images > li')
						.each(function(i,e) {
							app.character.images.push(e.textContent);
						});
					},
					error: function(data, textStatus) {
						console.log('error');
						alert('error');
					}
				});
			},
			fetchStory: function(me) {
				var story = me.target.innerText;
				$.ajax({
					type: 'GET',
					url: 'story/'+story+'.html',
					dataType:'xml',
					success: function(data, textStatus) {
						var dom = $(data);
						app.story.desc = $('<div></div>').append(dom.find('#description').children()).html();
						app.story.name = dom.find('title').text();
						app.story.path = dom.find('#path').text();
						dom
						.find('#characters > li')
						.each(function(i,e) {
							app.story.characters.push(e.textContent);
						});
						location.href = '#story-description';
					}
				});
			},
			fetchSs: function(me) {
				var ss = me.target.innerText;
				$.ajax({
					type: 'GET',
					url: 'short-story/'+ss+'.html',
					dataType: 'xml',
					success: function(data, textStatus) {
						var dom = $(data);
						app.ss.name = dom.find('title').text();
						app.ss.content = $('<div></div>').append(dom.find('#content').children()).html();
						dom
						.find('#characters > li')
						.each(function(i,e) {
							app.story.characters.push(e.textContent);
						});
					}
				});
			},
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
