$(document).ready(function() {
	
	// генерируем случайное целое число в указанном диапазоне
	function getRandomInt(min, max) {	
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	// создаем пример
	function createTask(a1, a2, sum1, sum2) {
		var a = getRandomInt(a1, a2),				// рандомно выбираем первое число a из нужного диапазона
			sum = getRandomInt(sum1, sum2),			// рандомно выбираем сумму на выходе из нужного диапазона
			b = sum - a,							// вычисляем второе слагаемое b
			task = document.querySelector('#task'),			// находим блок, в который нужно записать пример
			answers = [a, b, sum],							// создаем массив из правильных ответов (для проверки вводимых пользователем данных)
			length = [a, b];								// массив значений для рисования стрелок
		
		task.innerHTML = '<span class="a">' + a + '</span>' + ' + ' + '<span class="b">' + b + '</span> = <input id="sum" placeholder="?" disabled>';		// добавляем пример в блок
		console.log('Answers: ' + answers);
		checkInput(answers);
		drawArrows(length);
		$('#user_answers')[0].reset();			// очищаем инпуты (для IE/Edge)
	}
	
	// проверяем вводимые в поля числа
	function checkInput(answers) {
		$('input').blur(function() {				// проверка осуществляется после потери фокуса на инпуте
			var $id = $(this).attr('id'),
				$val = $(this).val();
			
			switch($id) {
				case 'a':
					if ($val != '' && $val == answers[0]) {					// если ответ верный,
						$('.next').css('display', 'inline-block');		// показываем следующие инпут и стрелку,
						$('.a').removeClass('invalid');						// убираем класс invalid с первого слагаемого из примера,
						$(this).prop('disabled',true);						// текущий инпут делаем недоступным для ред.
					}
					else {													// если ответ неверный,
						$(this).css('color', 'red');						// окрашиваем число в инпуте в красный,
						$('.a').addClass('invalid');						// добавляем к слагаемому из примера класс invalid (подсвечиваем желтым)
					}
					
					$(this).focus(function() {								// при возврате фокуса на инпут
						$('.a').removeClass('invalid');						// удаляем класс invalid из слагаемого из примера
						$(this).css('color', 'black');						// число в инпуте делаем обычным
					});
				break;
					
				case 'b':
					if ($val != '' && $val == answers[1]) {
						$('#sum').attr('placeholder', '').prop('disabled',false);
						$('.b').removeClass('invalid');
						$(this).prop('disabled',true);
					}
					else {
						$(this).css('color', 'red');
						$('.b').addClass('invalid');
					}
					
					$(this).focus(function() {
						$('.b').removeClass('invalid');
						$(this).css('color', 'black');
					});
				break;
				
				case 'sum':
					if ($val != '' && $val == answers[2]) {									// если сумма верна,
						$(this).prop('disabled',true).css('color','rgb(147, 201, 65)');		// делаем инпут недоступным для ред. и окрашиваем сумму
						$('#task').css('color','rgb(147, 201, 65)');						// и весь пример в зеленый
					}
					else {
						$(this).css('color', 'red');
					}
					
					$(this).focus(function() {
						$(this).css('color', 'black');
					});
				break;
			}
			
		});
	}

	// рисуем стрелки
	function drawArrows(length) {
		$('.arrow').each(function(i) {
			var $len = length[i]*39,				// результат сложения на шкале = ширина блока = ширина svg
				$mid = $len/2,						// средняя точка (для отрисовки кривой)
				$height = $mid/2+3,					// верхняя точка (для отрисовки кривой) = высота svg
				$svg = $(this).children('svg'),		// svg изображение
				$path = 'M0,' + $height + ' s' + $mid + ',-' + $mid + ' ' + $len + ',0';		// вычисляем path (для отрисовки кривой)
			
			console.log($len, $mid, $height, $path);
			
			$(this).css('width', $len);								// устанавливаем ширину блока по ширине svg (стрелки) - нужно для выравнивания инпута по центру кривой
			$svg.attr({'width':$len, 'height': $height});			// устанавливаем ширину и высоту svg
			$svg.children('path').attr('d', $path);					// устанавливаем path для кривой
		});
	}
	
	createTask(6, 9, 11, 14);
});













