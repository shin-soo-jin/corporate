const btnCall = document.querySelector('.btnCall');
const gnbMo = document.querySelector('#gnbMo');
const btnTop = document.querySelector('.btnTop');

// 햄버거 버튼 클릭 이벤트
btnCall.addEventListener('click', (e) => {
	e.preventDefault();

	btnCall.classList.toggle('on');
	gnbMo.classList.toggle('on');
});

// 탑버튼 클릭시 상단으로 이동
btnTop.addEventListener('click', (e) => {
	e.preventDefault();

	new Anim(window, {
		prop: 'scroll',
		value: '0',
		duration: 0,
	});
});
