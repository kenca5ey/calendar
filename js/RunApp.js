(function() {

  var calendarWrap = document.getElementById('calendar');
  var data = new Data();
  var board = new Board(data);
  var ev = new EventView();
  

  calendarWrap.appendChild(board.getWrap());

  var _onClickedArrow = function(arrowType, direction) {
    data.refreshData(arrowType, direction);
    board.removeCellIndicators();
    board.populateCells(data);
    board.addCellIndicators(data.savedRecords);
  };

  var _onClickedDate = function(cellIndex) {
    // ev.setData(boxData);
    //ev.setIsVisible( true );
    console.log(data.visibleDates[cellIndex]);
    data.addSavedRecord(data.visibleDates[cellIndex]);
  };

  var _onRecordAdded = function(record) {
    board.updateCellIndicator(record);
  };

  PubSub.on('clickarrow', _onClickedArrow);
  PubSub.on('clickdate', _onClickedDate);
  PubSub.on('recordadded', _onRecordAdded);

})();