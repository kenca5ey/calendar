var Arrow = (function() {

	var Arrow = function(conf) {
		this.initDom(conf);
	};

	Arrow.prototype.initDom = function(conf) {

		this.dom = document.createElement('div');
		this.dom.classList.add("arrow");
		this.dom.classList.add(conf.css);
		var me =this;
		this.dom.addEventListener('click', function() {
			PubSub.trigger('clickarrow', [conf.arrowType, conf.direction] );
		}, false);
	};
	return Arrow;

})(Arrow || {});