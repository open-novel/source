window.addEventListener("DOMContentLoaded", function() {
	var navapp = new Vue({
		el:"#nav",
		data: {
			ha0: false
		},
		computed: {
			
		},
		methods: {
			toggle: function(ha) {
				this[ha] = !this[ha];
				console.log(ha);
			}
		}
	});
	var mainapp = new Vue({
		el:"#ストーリー",
		data: {
			story:{
				name:null,
				desc:null,
				path:null,
				characters: []
			}
		},
		methods: {
			fetchStory: function(me) {
				var story = this.story.name;
				var app = this;
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
							app.story.characters = [];
							app.story.characters.push(e.textContent);
						});
						location.href = '#story-description';
					}
				});
			},
		}
	});
});
