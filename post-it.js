var postNumber = 0
var boardNum = 0

var Board = function(selector, boardNum) {
  var $board = $(selector);

  function initialize() {
    $board.on("click", newPostIt);
    $board.addClass("hidden");
    $("#board-"+boardNum).removeClass("hidden");
  };

  function newPostIt() {
    var x = event.offsetX;
    var y = event.offsetY;
    new PostIt(x, y, boardNum);
    postNumber += 1;
  };

  initialize();
};

var PostIt = function(x, y, boardNum) {

  function initialize() {
    $(".board#board-"+boardNum).append('<div class="post-it board-'+boardNum+' post-'+postNumber+'"><div class="header"><a href="#">X</a></div><div contenteditable="true" class="content"></div></div>')
    $(".post-"+postNumber).css({'top': y, 'left': x});
    $(".post-it").draggable({handle: ".header"});

    $(".content").on("click", stopPostItCreation);
    $("a").on("click", deletePostIt);
  };

  function stopPostItCreation(e){
    e.stopPropagation();
  };

  function deletePostIt(e){
    e.stopPropagation();
    var $thisPostIt = $(this.parentElement.parentElement);
    $thisPostIt.remove();
  };

  initialize();
};

var NavBar = function() {

  function handler() {
    $("#board-selector").on("click", "#new-board", addNewBoard);
    $("#board-selector").on("click", "#board-list li", showBoard);
  };

  function addNewBoard() {
    boardNum += 1;
    $("#board-area").append("<div class='hidden board' id='board-"+boardNum+"'></div>");
    $("#board-list").append("<li class='board-"+boardNum+"'>board "+boardNum+"</li>");

    new Board('.board', boardNum);
  };

  function showBoard() {
    var thisIdName = this.className;
    $(".board").addClass("hidden");
    $("#"+thisIdName).removeClass("hidden");
  };

  handler();
}

$(function() {
  new NavBar();
});