var Cell = (function() {
	'use strict';

	var Cell = function(cellType, index) {
		this.index = index;
		this.initDom(cellType);
	};

	Cell.prototype.initDom = function(cellType) {
		var me = this;
		this.dom = document.createElement('div');
		this.dom.classList.add(cellType);
		this.content = document.createElement('div');
		this.content.classList.add('cell-content');
		this.dom.appendChild(this.content);
		
		this.dom.addEventListener('click', function() {
			PubSub.trigger('clickdate', [me.index]);
		}, false);
	};

	return Cell;

})(Cell || {});