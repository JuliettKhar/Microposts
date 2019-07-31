import { libHttp } from './http';
import { ui } from './ui';

let postSubmit;
let posts;
let cardForm;

function findElements() {
 postSubmit = document.querySelector('.post-submit'); 
 posts = document.querySelector('#posts');
 cardForm = document.querySelector('.card-form');
}

function getPosts() {
		libHttp.get('http://localhost:3000/posts')
				.then( data => ui.showPosts(data))
				.catch( err => console.log(err))
}

function addPost() {
	const id = document.querySelector('#id').value;
	const body = document.querySelector('#body').value;
  const title = document.querySelector('#title').value;
	const data = {
			title,
			body
	}

	if (title === '' || body === '') {
		console.log(1)
		 ui.showAlert('Please fill in all fields', 'alert alert-danger');
	} else {
		if (id === '') {
			console.log(2)

		libHttp.post('http://localhost:3000/posts', data)
		.then( data => {
			ui.showAlert('Post added', 'alert alert-success');
			ui.clearFields();
			getPosts();
		})
		.catch(err => console.log(err) )

	} else {
		   libHttp.put(`http://localhost:3000/posts/${id}`, data)
      .then(data => {
        ui.showAlert('Post updated', 'alert alert-success');
        ui.changeFormState('add');
        getPosts();
      })
      .catch(err => console.log(err));
		}
	}
}

function deletePost(event) {
	const { target } = event;
	event.preventDefault();
	if (target.parentElement.classList.contains('delete')) {
		const id = target.parentElement.dataset.id;
		libHttp.delete(`http://localhost:3000/posts/${id}`)
			.then( data => {
				ui.showAlert('Post removed', 'alert alert-success');
				getPosts();
			})
			.catch( err => console.log(err))
	}
}

//Enable Edit State
function enableEdit(event) {
	const { target } = event;
	event.preventDefault();

	if (target.parentElement.classList.contains('edit')) {
		const id = target.parentElement.dataset.id;
		const body = target.parentElement.previousElementSibling.textContent;
		const title = target.parentElement.previousElementSibling.previousElementSibling.textContent;
		const data = {
			id,
			title,
			body
		}
		//Fill Form with Current Post
		ui.fillForm(data);
	}
}

function cancelEdit(e) {
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }

  e.preventDefault();
}


function subscribe() {
	document.addEventListener('DOMContentLoaded', getPosts);
	postSubmit.addEventListener('click', addPost);
	posts.addEventListener('click', deletePost);
	posts.addEventListener('click', enableEdit);
	cardForm.addEventListener('click', cancelEdit);
}

export function init() {
	findElements();
	subscribe();
}