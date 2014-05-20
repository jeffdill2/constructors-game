/*//////////////////////////////////////////////////////////
/////////////////////////////////////////////////// FIGHTERS
//////////////////////////////////////////////////////////*/
function Mason() {
	this.power = 4;
	this.image = 'mason.png';
	this.name = 'Mason Stewart';
}

function Joe() {
	this.power = 3;
	this.image = 'joe.png';
	this.name = 'Joe Tamburro';
}

function Eric() {
	this.power = 2;
	this.image = 'eric.png';
	this.name = 'Eric Dodds';
}

/*//////////////////////////////////////////////////////////
//////////////////////////////////////////////////// ENEMIES
//////////////////////////////////////////////////////////*/
function ArnoldSchwarzenegger() {
	this.power = 1;
	this.image = 'arnold.png';
	this.name = 'Arnold Schwarzenegger';
	this.defeated = false;
}

function JeanClaudeVanDamme() {
	this.power = 1.5;
	this.image = 'jean-claude.png';
	this.name = 'Jean Claude Van Damme';
	this.defeated = false;
}

function JackieChan() {
	this.power = 2;
	this.image = 'jackie.png';
	this.name = 'Jackie Chan';
	this.defeated = false;
}

function ChuckNorris() {
	this.power = 100;
	this.image = 'chuck.png';
	this.name = 'Chuck Norris';
	this.defeated = false;
}

/*//////////////////////////////////////////////////////////
///////////////////////////////////// INITIALIZING VARIABLES
//////////////////////////////////////////////////////////*/
var strFighterNumber = "";
var objFighter;
var aryEnemies = [new ArnoldSchwarzenegger(), new JeanClaudeVanDamme(), new JackieChan(), new ChuckNorris()];
var objEnemy;

/*//////////////////////////////////////////////////////////
////////////////////////////////////////////////// FUNCTIONS
//////////////////////////////////////////////////////////*/
function chooseEnemy() {
	var bolEnemyFound = false;
	var objEnemy;

	aryEnemies.forEach(function(enemy) {
		if (!bolEnemyFound) {
			if (!enemy.defeated) {
				bolEnemyFound = true;
				objEnemy = enemy;
			}
		}
	});

	return objEnemy;
}

function setEnemy(objEnemy) {
	$('#enemy').empty();
	$('#enemy').prepend('<img src="../images/' + objEnemy.image + '">');
	$('#enemy-name').text(objEnemy.name);
	$('#enemy-health').width(500);
	$('#fighter-health').width(500);
	$('#outcome').css('opacity','0');
}

function setFighter(objFighter) {
	$('#fighter').prepend('<img src="../images/' + objFighter.image + '">');
	$('#fighter-name').text(objFighter.name);
}

function generateRandomNumber() {
    var numMin = 1;
    var numMax = 5;

    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
}

function displayOutcome(strOutcome) {
	$('#outcome').css('opacity','0');

	if (strOutcome == 'win') {
		$('#outcome').text('YOU LANDED YOUR ATTACK!');
	} else {
		$('#outcome').text('YOUR ATTACK WAS COUNTERED!');
	}
	
	$('#outcome').delay(600).animate({'opacity': '1'});
}

$('#fight-button').click(function() {
	var numFighterAttack;
	var numEnemyBlock;

	$('#fist1').animate({
		opacity: '1',
		left: '1000px'
	}, 400, 'linear', function() {
		$(this).css({
			opacity: '0',
			left: '200px'
		});
	});

	numFighterAttack = generateRandomNumber() * objFighter.power;
	numEnemyBlock = generateRandomNumber() * objEnemy.power;

	console.log("numFighterAttack:",numFighterAttack);
	console.log("numEnemyBlock:",numEnemyBlock);

	$('#attack-value').text(numFighterAttack);
	$('#block-value').text(numEnemyBlock);

	if (numFighterAttack >= numEnemyBlock) {
		$('#enemy-health').width($('#enemy-health').width() - 50);
		
		displayOutcome('win');
	} else {
		$('#fighter-health').width($('#fighter-health').width() - 50);

		$('#fist2').delay(500).animate({
			opacity: '1',
			right: '1000px'
		}, 400, 'linear', function() {
			$(this).css({
				opacity: '0',
				right: '200px'
			});
		});
		
		displayOutcome('lose');
	}

	if ($('#fighter-health').width() === 0) {
		$('#fight-button').css({'background-color': '#666', 'color': '#999'});
		$('#fight-button').off();
		
		if (objEnemy.name.toUpperCase() === "CHUCK NORRIS") {
			alert("Seriously, you thought you could beat " + objEnemy.name + "?!\n\nDefeat was inevitable.");
		} else {
			alert("You've been defeated by " + objEnemy.name + "!\n\nPlease refresh your browser to play again.");
		}
	}

	if ($('#enemy-health').width() === 0) {
		alert('You have defeated ' + objEnemy.name + '...\n\nPrepare for your next opponent!');
		
		aryEnemies[aryEnemies.indexOf(objEnemy)].defeated = true;
		objEnemy = chooseEnemy();
		setEnemy(objEnemy);
	}
});

/*//////////////////////////////////////////////////////////
////////////////////////////////////////////////////// FIGHT 
//////////////////////////////////////////////////////////*/
while (strFighterNumber < 1 || strFighterNumber > 3) {
	strFighterNumber = prompt("Choose your fighter:\n\n- Mason\t--\tenter 1\n- Joe\t\t--\tenter 2\n- Eric\t--\tenter 3");
}

switch (strFighterNumber) {
	case "1":
		objFighter = new Mason();
		break;

	case "2":
		objFighter = new Joe();
		break;

	case "3":
		objFighter = new Eric();
		break;

	default:
		break;
}

setFighter(objFighter);

objEnemy = chooseEnemy();

setEnemy(objEnemy);