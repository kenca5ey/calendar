(function() {

  var calendarWrap = document.getElementById('calendar');
  var data = new Data();
  var board = new Board(data);
  var currentCellKey = null;
  var currentCellIndex = null;

  calendarWrap.appendChild(board.getWrap());
  var ev = new EventView();

  var _onClickedArrow = function(arrowType, direction) {
    data.refreshData(arrowType, direction);
    board.removeCellIndicators();
    board.populateCells(data);
    board.addCellIndicators(data.savedRecords);
  };

  var _onClickedDate = function(cellIndex) {
    
    ev.setIsVisible( true );
    currentCellIndex = cellIndex;
    currentCellKey = data.visibleDates[currentCellIndex].year.toString() + data.visibleDates[currentCellIndex].month.toString() + data.visibleDates[currentCellIndex].date.toString();
    if(data.savedRecords[currentCellKey]){
        ev.setData(data.savedRecords[currentCellKey].eventText);
    } else{
        ev.setData("");
    }
    console.log(data.visibleDates[cellIndex]);
  };

  var _onClickedSave = function(eventText) {
    console.log('Saved');
    if(eventText){
      data.addSavedRecord(data.visibleDates[currentCellIndex], eventText);
  }else{
      board.removeCellIndicator(currentCellIndex);
      data.removeSavedRecord(currentCellKey);
  }
  };

  var _onRecordAdded = function(record) {
    board.updateCellIndicator(record);
  };

  PubSub.on('saveevent', _onClickedSave);
  PubSub.on('clickarrow', _onClickedArrow);
  PubSub.on('clickdate', _onClickedDate);
  PubSub.on('recordadded', _onRecordAdded);

})();