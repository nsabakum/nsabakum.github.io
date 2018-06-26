$(document).ready(function(){
	
	// Закрепление меню при прокрутке
	function scrollFixTop() {
		$(window).scroll(function(){
			var top = $(this).scrollTop();
			var elem = $('#menu .navbar');
			if (top < 250) {
				elem.removeClass('fixed-top');
			} else {
				elem.addClass('fixed-top');
			}
		});
	};
	scrollFixTop();


	// Калькулятор стоимости помещения с учетом модификатора
    $('#result').click(function(e) {
		e.preventDefault();
		var $square = $('#square').val();
		var $mod = $('#modifyer').val();
		var $res = $('#calc .result');
		var $err_square = $('#square + small');
		var $err_mod = $('#modifyer + small');
		
		$err_square.text('');
		$err_mod.text('');
		
		function calculate(square, mod, res) {
			var cost;
			
			if (square > 10 && square < 51) {
				cost = 10000;
			} else if (square > 50 && square < 101) {
				cost = 15000;
			} else if (square > 100 && square < 201) {
				cost = 20000;
			};
			
			if (mod == 1) {
				k = 1;
			} else if (mod == 2) {
				k = 1.25;
			} else if (mod == 3) {
				k = 1.5;
			};
			
			total = square * cost * k;
			console.log(square, cost, k, total);
			
			res.text(total + ' руб.');
		};
		
		if ($square == '' || $square < 10 || $square > 200) {
			$err_square.text('Введите площадь (от 10 до 200 кв.м.)');
		} else if ($mod == 0) {
			$err_square.text('');
			$err_mod.text('Выберите модификатор');
		} else {
			$err_mod.text('');
			calculate($square, $mod, $res);
		};
    });
	
	
	// Наполняем модальные окна
	function fillModals() {
		// примеры контента и цветов
		twitter = {content:'Hello, Twitter!', color:'#ffe9e9'};
		rss = {content:'Hello, RSS!', color:'#9ee0ff'};
		skype = {content:'Hello, Skype!', color:'#ffffdb'};
		fb = {content:'Hello, Facebook!', color:'#d9ffd9'};
		
		function modalContent(id, params) {
			var id, params;
			console.log(id, params);
			elem = '#modal_' + id;
			
			$(elem + ' .modal-content').css('background-color', params.color);
			$(elem + ' .modal-body').html(params.content);
			
		};
		
		modalContent('twitter', twitter);
		modalContent('rss', rss);
		modalContent('skype', skype);
		modalContent('fb', fb);
	};
	fillModals();
});
 