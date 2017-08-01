$(document).ready(function(){
	var player = {human:{},computer:{}};
	var gameTracker = {gameRun:true, turn:true, board:["E","E","E","E","E","E","E","E","E"],count:0};

	function reset(){
		$(".square").removeClass("clicked").addClass("unclicked").text("");
		$("#board").hide();
		$("#choices").show();
		gameTracker.gameRun = true;
		gameTracker.turn = true;
		gameTracker.board = ["E","E","E","E","E","E","E","E","E"];
		gameTracker.count = 0;
	}
	function boardFull(board) {
		if (board.indexOf("E") >= 0){
			return false;
		} else {
			return true;
		}
	}
	//check for winning combinations on the board
	function checkWin(board,player){
	 
		if	(
			(board[0] == player.piece && board[1] == player.piece && board[2] == player.piece) ||
			(board[3] == player.piece && board[4] == player.piece && board[5] == player.piece) ||
			(board[6] == player.piece && board[7] == player.piece && board[8] == player.piece) ||
			(board[0] == player.piece && board[3] == player.piece && board[6] == player.piece) ||
			(board[1] == player.piece && board[4] == player.piece && board[7] == player.piece) ||
			(board[2] == player.piece && board[5] == player.piece && board[8] == player.piece) ||
			(board[0] == player.piece && board[4] == player.piece && board[8] == player.piece) ||
			(board[2] == player.piece && board[4] == player.piece && board[6] == player.piece)
			) {
				gameTracker.gameRun = false;
				if (player.key == "H") {
					setTimeout(function() {
				        alert("YOU WIN");
				        reset();
				      }, 200);
					
				} else {
					setTimeout(function() {
				        alert("YOU LOSE");
				        reset();
				      }, 200);	
				}
			} else  if (boardFull(board) === true){
				setTimeout(function() {
			        alert("It's a draw");
			        reset();
			      }, 200);	
			} else {
			gameTracker.gameRun = true;
			}
		}
	
	
	
	
	function computerPlay() {
		if (gameTracker.gameRun === false || gameTracker.count === 5) {
			return;
		}
		while (gameTracker.board[computerMove] !== "E"){
			var computerMove = Math.floor(Math.random()*9);
		}
		gameTracker.board[computerMove] = player.computer.piece;
		if (player.computer.piece === "X"){
			$("#"+computerMove).text(player.computer.piece).css({"color":"red", "font-size":"4.5em"});
		} else {
			if (player.computer.piece === "O"){
				$("#"+computerMove).text(player.computer.piece).css({"color":"blue", "font-size":"4.5em"});
			}
		}
		checkWin(gameTracker.board, player.computer);
		gameTracker.turn = true;
	}
	
	
	 	
	 
	//place tokens and initiate computer's turn
	function placeToken (id){
		gameTracker.board[id] = player.human.piece;
		gameTracker.count++;
		checkWin(gameTracker.board, player.human);
		boardFull(gameTracker.board);
		if (gameTracker.gameRun === true && gameTracker.turn === false){
			computerPlay();
		}
	}
	
	//set player tokens at start of game
	$("#chooseX").click(function(){
		$("#choices").hide();
		$("#board").show();
		player.human.piece = "X";
		player.human.key = "H";
		player.computer.piece = "O";
		player.computer.key = "C";
	});
	
	
	$("#chooseO").click(function(){
		$("#choices").hide();
		$("#board").show();	
		player.human.piece = "O";
		player.human.key = "H";
		player.computer.piece = "X";
		player.computer.key = "C";
	});
	
	//human player starts game by clicking on a square
	$(".square").click(function(){
		var position = $(this).attr("id");
		if(gameTracker.turn === true && gameTracker.gameRun === true){
		$(this).each(function(){
			if ($(this).hasClass("unclicked")){
				$(this).removeClass("unclicked").addClass("clicked");
			}
			if (player.human.piece === "X"){
				$(this).text("X").css({"color":"red","font-size":"4.5em"});
			} else {
				if (player.human.piece === "O"){
					$(this).text("O").css({"color":"blue","font-size":"4.5em"});
				}
			}
			gameTracker.turn = false;
			placeToken(position);
		});
		}
	});
	
	$("#reset").click(function(){
		reset();
	});
	
	
});
