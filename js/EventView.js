var EventView = (function( EventView, $ ) {
	'use strict';

	EventView = function() {
		var me = this;
		this.isVisible = false;
		this.body = document.getElementsByTagName('body')[0];
		this.dom = document.createElement('div');
		this.dom.style.float = 'bottom';
		this.dom.style.position = 'relative';
		this.dom.style.overflow =  'scroll';
		this.dom.style.margin = 'auto auto';
		this.dom.style.height = '250px';
		this.dom.style.width = '70%';
		this.dom.style.background = '#F0E68C';
		this.body.appendChild(this.dom);
		this.dom.style.display = 'none';
		this.dom.style.color = '#696969';
		this.content = document.createElement('div');
		this.content.contentEditable = true;
		this.content.classList.add('Enter','text','here');
		this.content.style.height = '90%';
		this.saveBtn = document.createElement('button');
		this.saveBtn.innerHTML = 'save';
		this.saveBtn.style.position = 'absolute';
		this.saveBtn.style.bottom = "0";
		this.dom.appendChild(this.content);
		this.dom.appendChild(this.saveBtn);
		this.closeBtn = document.createElement('button');
		this.closeBtn.style.position = 'absolute';
		this.closeBtn.style.bottom = "0";
		this.closeBtn.style.right = "0";
		
		this.closeBtn.innerHTML = 'close';
		this.dom.appendChild(this.closeBtn);

		this.saveBtn.onclick = function() {
			var detailsEntered = me.content.innerHTML;
			PubSub.trigger('saveevent', [detailsEntered]);
			me.setIsVisible(false);
		};

		this.closeBtn.onclick = function() {
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
		this.refreshView(data);
	};

	EventView.prototype.refreshView = function(EventText) {
		
		this.content.innerHTML = EventText;
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