var Board = (function() {

  var Board = function(conf) {
    this._wrap = null;
    this.pool = [];
    this.init(conf);
    this.cellsWithIndicator = [];
    this.numCellsWithIndicator = 0;
  };

  Board.prototype.init = function(conf) {
    this.setWrap(document.createElement('div'));

    this.getWrap().classList.add('board-wrap');
    this.addYearTitle();
    this.addMonthTitle();
    this.addDayTitle(conf);
    this.genCells(conf.boardConf.num);
    this.populateCells(conf);
  };

  Board.prototype.getWrap = function() {
    return this._wrap;
  };

  Board.prototype.setWrap = function(dom) {
    this._wrap = dom;
  };

  Board.prototype.addYearTitle = function() {
    this.yearTitleDiv = document.createElement('div');
    this.yearTitleDiv.classList.add('board-year');
    this.yearArrowLeft = new Arrow({css:"triangle-left-year", arrowType:"year",direction:"down"});
    this.yearArrowRight = new Arrow({css:"triangle-right-year",arrowType:"year",direction:"up"});
    this.getWrap().appendChild(this.yearArrowLeft.dom);
    this.getWrap().appendChild(this.yearArrowRight.dom);
    this.getWrap().appendChild(this.yearTitleDiv);
  };

  Board.prototype.addMonthTitle = function() {
    this.monthTitleDiv = document.createElement('div');
    this.monthTitleDiv.classList.add('board-month');
    this.monthArrowLeft = new Arrow({css:"triangle-left-month",arrowType:"month",direction:"down"});
    this.monthArrowRight = new Arrow({css:"triangle-right-month",arrowType:"month",direction:"up"});
    this.getWrap().appendChild(this.monthArrowLeft.dom);
    this.getWrap().appendChild(this.monthArrowRight.dom);

    this.getWrap().appendChild(this.monthTitleDiv);
  };

  Board.prototype.addDayTitle = function(conf) {
    this.dayTitleDiv = document.createElement('div');

    this.dayTitleDiv.classList.add('board-weekday-bar');
    var frag, cell, i = 0;
    frag = document.createDocumentFragment();

    for (i; i < 7; i++) {
      cell = new Cell("weekday-cell");
      this.dayTitleDiv.appendChild(cell.dom);
      cell.content.innerHTML = conf.daysOfWeek[i];
    }
    this.dayTitleDiv.appendChild(frag);
    this.getWrap().appendChild(this.dayTitleDiv);

  };


  Board.prototype.genCells = function(num) {
    var i = 0,
      j = 0,
      cellConf = {},
      frag, cell, s;
    frag = document.createDocumentFragment();

    for (; i < num; i++) {

      cell = new Cell('date-cell',i);

      this.pool.push(cell);
      frag.appendChild(cell.dom);
    }
    this.getWrap().appendChild(frag);
  };

  Board.prototype.populateCells = function(conf) {
    this.yearTitleDiv.innerHTML = conf.boardConf.yearTitleText;
    this.monthTitleDiv.innerHTML = conf.boardConf.monthTitleText;
    
    var i,j;
    i = 0;
    for(; i<Object.keys(conf.visibleDates).length; i++){
        this.pool[i].content.innerHTML = conf.visibleDates[i].date;
        this.pool[i].content.style.color = conf.visibleDates[i].color;
        this.pool[i].content.classList.remove("cell-has-record");
        if(conf.visibleDates[i].recordExists) this.pool[i].content.classList.add("cell-has-record");
    }
  };

  Board.prototype.updateCellIndicator = function(record) {
    
    this.pool[record.cellIndex].content.classList.add('record-saved');
    this.cellsWithIndicator[this.numCellsWithIndicator] = record.cellIndex;
    this.numCellsWithIndicator+=1;
  };

  Board.prototype.addCellIndicators = function(savedRecords) {
    for(var i = 0;i<savedRecords.length;i++){
      this.pool[savedRecords.cellIndex].content.classList.add('record-saved');
      this.cellsWithIndicator[this.numCellsWithIndicator] = record.cellIndex;
      this.numCellsWithIndicator+=1;
    }
  };

  Board.prototype.removeCellIndicators = function() {
    for (var i = 0; i < this.numCellsWithIndicator; i++) {
      var cellIndex = this.cellsWithIndicator[i];
      this.pool[cellIndex].content.classList.remove('record-saved');
    }
    this.numCellsWithIndicator = 0;
    this.cellsWithIndicator = [];
  };

  return Board;

})(Board || {});