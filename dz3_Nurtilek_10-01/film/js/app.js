/* Задания на урок:

1) Изменить жанр фильма, поменять "комедия" на "драма"

2) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

3) Удалить все рекламные блоки со страницы (правая часть сайта)

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов 

6) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. 

Страница не должна перезагружаться. event.preventDefault()
Новый фильм должен добавляться в movieDB.movies.

7) Если название фильма больше, чем 15 символ - обрезать его и добавить три точки

8) При клике на мусорную корзину - элемент будет удаляться из списка и в movieDB.movies (сложно)

9) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

10) Фильмы должны быть отсортированы по алфавиту 
*/

const movieDB = {
	movies: [
		'Логан',
		'Агент 007 dhsdghsghdghsgdhgshdghsgdhgshdgj',
		'Лига справедливости',
		'Ла-ла лэнд',
		'Одержимость',
		'Скотт Пилигрим против',
	],
};

let { movies } = movieDB;
console.log("movies:", movies);

movies.sort();

window.addEventListener('DOMContentLoaded', () => {
	const promo__genre = document.querySelector('.promo__genre'),
		promo__bg = document.querySelector('.promo__bg'),
		promo__adv = document.querySelectorAll('.promo__adv img'),
		movieList = document.querySelector('.promo__interactive-list'),
		addForm = document.querySelector('.add'),
		input = addForm.querySelector('.adding__input'),
		checked = document.querySelector('#checked')

	const deleteAdv = ()=>{
		promo__adv.forEach(img => {
			img.remove();
		});
	}

	deleteAdv()

	promo__genre.innerHTML = 'драма';
	promo__bg.style.backgtoundImage = 'url("img/bg.jpg")';

	const renderElement = (film, parent) => {
		movieList.innerHTML = '';
		film.forEach((movie, index) => {
			parent.innerHTML += `
			<li class="promo__interactive-item"> ${index + 1} ${
				movie.length > 15 ? movie.substring(0,15) + '...': movie
			}
			<div class="delete"></div>
		</li>`;
		});
		document.querySelectorAll('.delete').forEach((btn,i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				console.log(movies);
				movies.splice(i, 1);
				// movies.sort();
				renderElement(movies, movieList);
			});	
		});
	}

	addForm.addEventListener('submit', e => {
		e.preventDefault();
		let newFilm = input.value;
		let favorite = checked.checked;
		if (newFilm !== ''){
			movieDB.movies.push(newFilm);
		} else{
			return false
		}
		console.log(movieDB.movies)
		movies.sort();
		renderElement(movies, movieList);
		
		input.value =  ''
	});
	
	renderElement(movies, movieList);
});

