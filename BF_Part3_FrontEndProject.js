// $('h1').click(function(){
//   console.log("There was a click!");
// })

var boardButton = $('button');
var table = $('table tr');

var playerOneName = prompt('Player 1: \nEnter your name.')
var playerOneColor = 'red'
var playerTwoName = prompt('Player 2: \nYou must also enter your name.')
var playerTwoColor = 'black'

if (playerOneName == '' || playerOneName == null)
{
  playerOneName = 'Player 1'
}

if (playerTwoName == '' || playerTwoName == null)
{
  playerTwoName = 'Player 2'
}

var currentPlayerName = playerOneName;
var currentPlayerColor = playerOneColor;

var headingH1 = $('h1')
var headingH2 = $('h2')
var headingH3 = $('h3')
var testI = 1


headingH3.text(currentPlayerName + ":  It is your turn.  Please drop a " + currentPlayerColor + " chip.")

boardButton.on('click',function()
{
  //Fill in the corresponding column
  var columnIndex = $(this).closest('td').index()
  fillColumnBottom(columnIndex, currentPlayerColor)

  //Check for Win and Swap Turns IF the chosen column was not FULL

  if (successfulTurn)
  {
    //Check for Win

    if (checkforWin())
    {
      gameEnd()
    }

    //Swap Turns
    if (currentPlayerName === playerOneName)
    {
        currentPlayerName = playerTwoName
        currentPlayerColor = playerTwoColor
    }
    else
    {
        currentPlayerName =  playerOneName
        currentPlayerColor = playerOneColor
    }
    headingH3.text(currentPlayerName + ":  It is your turn.  Please drop a " + currentPlayerColor + " chip.")

  }

})



function fillColumnBottom(columnIndex, color)
{
  var rowIndex = 100;
  for (var i = 0; i < 6; i++)
  {
    if (getColor(i,columnIndex)=='rgb(128, 128, 128)')
    {
      rowIndex = i
    }
  }
  if (rowIndex===100)
  {
    //COLUMN IS FULL
    successfulTurn = false;
  }
  else
  {
    setColor(rowIndex, columnIndex, color)
    successfulTurn = true;
  }
}


function getColor(rowIndex, columnIndex)
{
  return table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color')
}

function setColor(rowIndex, columnIndex, color)
{
  table.eq(rowIndex).find('td').eq(columnIndex).find('button').css('background-color',color)
}

function checkforWin()
{
  if (horizontalWin() || verticalWin() || diagonalWin())
  {
    return true;
  }
  else
  {
    return false;
  }
}

function horizontalWin()
{
  for (var row = 0; row < 6 ; row++) //ROWS
  {
    for (var col = 0; col < 4; col++) //COLUMNS
    {
      if (isMatching(getColor(row,col),getColor(row,col+1),getColor(row,col+2),getColor(row,col+3)))
      {
        return true;
      }
    }
  }
}


function verticalWin()
{
  for (var col= 0; col < 7 ; col++) //ROWS
  {
    for (var row = 0; row < 3; row++) //COLUMNS
    {
      if (isMatching(getColor(row,col),getColor(row+1,col),getColor(row+2,col),getColor(row+3,col)))
      {
        return true;
      }
    }
  }
}


function diagonalWin()
{
  for (var row = 0; row < 6 ; row++) //ROWS
  {
    for (var col = 0; col < 7; col++) //COLUMNS
    {
      if (isMatching(getColor(row,col),getColor(row+1,col+1),getColor(row+2,col+2),getColor(row+3,col+3)))
      {
        return true;
      }
      else if (isMatching(getColor(row,col),getColor(row-1,col+1),getColor(row-2,col+2),getColor(row-3,col+3)))
      {
        return true;
      }
    }
  }
}


function isMatching(one, two, three, four)
{
  if (one===two && one===three && one===four && one!=='rgb(128, 128, 128)' && one!==undefined)
  {
    return true;
  }
  else
  {
    return false;
  }
}


function gameEnd()
{
  var newH1CSS =
  {
    'fontSize':'50px',
     'font-weight': 'bold'
  }
  headingH1.text(currentPlayerName + " is the champion of the universe!!!").css(newH1CSS)
  headingH2.text("Click Refresh to Play Again.").css('fontSize','40px')
  headingH3.fadeOut('fast')
}


//LOCATE A SPECIFIC ITEM ON THE TABLE AND CHANGE ITS COLOR
//OR MORE SPECIFICALLY, FIND A TABLE ROW, THEN WITHIN THAT ROW A COLUMN, THEN WITHIN THAT SPECIFIC CELL THE BUTTON PROPERTY, THEN WITHIN THAT BUTTON THE BACKGROUD COLOR PROPERTY
//FIRST ASSIGN A VARIABLE TO TABLE TR, WHICH RETURNS AN "ARRAY" OF EACH TABLE ROW WITHIN THE TABLE
//THEN INDEX TO A CERTAIN TABLE ROW
//EACH ROW HAS SOME NUMBER OF COLUMNS.  FIND THE COLUMN PROPERTY AND INDEX TO A CERTAIN VALUE
//ONCE THERE, FIND THE BUTTON PROPERTY AND ACCESS ITS CSS PROPERTIES
//CHANGE OR RETURN THE BACKGROUND COLOR TO A COLOR
