var EventView = (function( EventView, $ ) {
	'use strict';

	EventView = function() {
		var me = this;
		this.isVisible = false;
		this.body = document.getElementsByTagName('body')[0];
		this.dom = document.createElement('div');
		this.dom.style.position = 'absolute';
		this.dom.style.height = '500px';
		this.dom.style.width = '700px';
		this.dom.style.background = 'green';
		this.body.appendChild(this.dom);
		this.dom.style.display = 'none';
		this.dom.style.color = '#fff';
		this.content = document.createElement('div');
		this.saveBtn = document.createElement('button');
		this.saveBtn.innerHTML = 'save';
		this.dom.appendChild(this.content);
		this.dom.appendChild(this.saveBtn);


		this.saveBtn.onclick = function() {
			PubSub.trigger('saveevent');
		};

		this.dom.onclick = function() {
			me.setIsVisible(false);
		};
		this.data = null;
	};

	EventView.prototype.setIsVisible = function( flag )  {
		var dom = this.dom;
		flag ? $(dom).fadeIn() : $(dom).fadeOut();
	};

	EventView.prototype.setData = function( data ) {
		this.data = data;
		this.updateView(data);
	};

	EventView.prototype.updateView = function(data) {
		var content = '';
		for(var i in data) {
			content += data[i] + '<br>';
		}
		this.content.innerHTML = content;
	};

	return EventView;

}) ( EventView || {}, jQuery );