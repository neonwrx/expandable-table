
let tableRef = document.getElementById('TableA'),
    newCell,
    actions = document.getElementsByClassName('action'),
    actionsCell = document.getElementsByClassName('action-cell'),
    actionsLg = actions.length,
    actionsCellLg = actionsCell.length;

function getNodeindex(elm){
  return [...elm.parentNode.children].indexOf(elm);
}

function addRow() {
  let newRow = tableRef.insertRow(tableRef.rows.length-1);

  newCell = newRow.insertCell(0);
  newCell.classList.add('action');
  newCell.innerHTML = '-';
  for( let i=1; i<tableRef.rows[1].cells.length-1; i++) {
    newCell = newRow.insertCell(i);
    newCell.classList.add('field');
  }
  actionsLg = actionsLg+1;
  delRowEvent();
}

function addCell() {
  newCell = tableRef.rows[0].insertCell(tableRef.rows[0].cells.length);
  newCell.classList.add('action-cell');
  newCell.innerHTML = '-';
  newCell = tableRef.rows[1].insertCell(tableRef.rows[1].cells.length-1);
  newCell.classList.add('field');
  for( let i=2; i<tableRef.rows.length-1; i++) {
    newCell = tableRef.rows[i].insertCell(tableRef.rows[i].cells.length);
    newCell.classList.add('field');
  }
  actionsCellLg = actionsCellLg+1;
  delCellEvent();
}

function delRow(event) {
  let index = getNodeindex(event.target.parentNode);
  if (actionsLg > 1) {
    actionsLg = actionsLg-1;
    tableRef.deleteRow(index);
  }
  if (index == 1) {
    let addNewCell = tableRef.rows[1].insertCell(-1);
    addNewCell.classList.add('addCell');
    addNewCell.id = ('addCell');
    addNewCell.innerHTML = '+';
    addNewCell.onclick = addCell;
  }
}

function delCell(event) {
  let index = getNodeindex(event.target);
  if (actionsCellLg > 1) {
    actionsCellLg = actionsCellLg-1;
    tableRef.rows[0].deleteCell(index);
    if (index == 0) {
      for( let i=1; i<tableRef.rows.length-1; i++) {
        tableRef.rows[i].deleteCell(index+1);
      }
      tableRef.deleteRow(-1);
      let newRow = tableRef.insertRow(tableRef.rows.length);
      let addNewRow = newRow.insertCell(0);

      addNewRow.classList.add('addRow');
      addNewRow.id = ('addRow');
      addNewRow.innerHTML = '+';
      addNewRow.onclick = addRow;
    } else {
      for( let i=1; i<tableRef.rows.length-1; i++) {
        tableRef.rows[i].deleteCell(index+1);
      }
    }
  }
}

function delRowEvent () {
  for(let i = 0; i < actionsLg; i++) {
    actions[i].addEventListener('click', delRow, false);
  }
}

function delCellEvent () {
  for(let i = 0; i < actionsCellLg; i++) {
    actionsCell[i].addEventListener('click', delCell, false);
  }
}

tableRef.addEventListener("mouseover", function(event) {
  let target = event.target;
  let index = getNodeindex(event.target);
  if (target.nodeName == 'TD' && target.className == 'field') {
    for(let i=0; i<actions.length; i++) {
      if (actions[i].classList.contains('show')) {
        actions[i].classList.remove('show');
      }
    }
    for(let i=0; i<actionsCell.length; i++) {
      if (actionsCell[i].classList.contains('show')) {
        actionsCell[i].classList.remove('show');
      }
    }
    if (actionsLg>1) {
      target.parentNode.children[0].classList.add("show");
    }
    if (actionsCellLg>1) {
      target.parentNode.parentNode.children[0].children[index-1].classList.add("show");
    }
  }
}, false);

tableRef.addEventListener("mouseout", function(event) {
  let target = event.target;
  if (event.relatedTarget.nodeName != 'TABLE' && event.relatedTarget.nodeName != 'TD') {
    for(let i=0; i<actions.length; i++) {
      if (actions[i].classList.contains('show')) {
        setTimeout (() => {
          actions[i].classList.remove('show');
        }, 500);
      }
    }
    for(let i=0; i<actionsCell.length; i++) {
      if (actionsCell[i].classList.contains('show')) {
        setTimeout (() => {
          actionsCell[i].classList.remove('show');
        }, 500);
      }
    }
  }
}, false);

document.getElementById('addRow').addEventListener('click', addRow, false);
document.getElementById('addCell').addEventListener('click', addCell, false);

delRowEvent();
delCellEvent();
