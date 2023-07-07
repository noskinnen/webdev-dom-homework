import { initAnswerComment, initUpdateLike, sentComment } from './optioncomments.js';
import { currentUser, token, renderLogin } from './autorization.js';
import { fetchComments } from './api.js';
import { letDisabledButton, letClearForm } from './changeelement.js';

// let currentDate = new Date();

// const formattedDate = (dateObject) => {
//     let minutes = dateObject.getMinutes();
//     let months = dateObject.getMonth() + 1;
//     let years = dateObject.getFullYear() - 2000;
//     if (minutes < 10) {
//       minutes = "0" + minutes;
//     }
//     if (months < 10) {
//       months = "0" + months;
//     }
//     const outDate = dateObject.getDate() + '.' + months + '.' + years + '  ' + dateObject.getHours() + ':' + minutes;
//     return outDate;
//   }

  export  const renderComments = (commentArray) => {
    const listElement = document.getElementById("comment-list");
    const commentHtml = commentArray.map((item, index) => {
      let activeLike = '';
      if (commentArray[index].isActiveLike) {
        activeLike = '-active-like'
      }
      return `  
      <li class="comment">
        <div class="comment-header">
          <div> ${item.name} </div>
          <div> ${item.date} </div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${item.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              ${item.likes}
            </span>
            <button class="like-button ${activeLike}" data-id="${item.id}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
    }).join('');
    listElement.innerHTML = commentHtml;

  }

  export const renderApp = (commentArray) => {
    const appElement = document.getElementById('app');
    if (!token) {
      renderLogin (appElement, fetchComments);
      return 
    }

    const commentHtml = commentArray.map((item, index) => {
      let activeLike = '';
      if (commentArray[index].isActiveLike) {
        activeLike = '-active-like'
      }
      return `  
      <li class="comment">
        <div class="comment-header">
          <div> ${item.name} </div>
          <div> ${item.date} </div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${item.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">
              ${item.likes}
            </span>
            <button class="like-button ${activeLike}" data-id="${item.id}" data-index="${index}"></button>
          </div>
        </div>
      </li>`
    }).join('');

    const appHtml = `
    
    <ul class="comments" id="comment-list">
       ${commentHtml} 
    </ul>
    <div class="dpnone text-wile">
Пожалуйста подождите,комментарий загружается...
    </div>

    <div class="add-form">
      <input type="text" class="add-form-name" id="input-name" value=${currentUser} disabled/>
      <textarea
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш комментарий"
        id="input-text"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button add-form-button_disabled" id="add-button" disabled>Написать</button>
      </div>
    </div>`
    appElement.innerHTML = appHtml; 

    const buttonElement = document.getElementById("add-button");
    const nameElement = document.getElementById("input-name");
    const textElement = document.getElementById("input-text");

    nameElement.addEventListener('input', () => {
      letDisabledButton(nameElement.value);
    });
    textElement.addEventListener('input', () => {
      letDisabledButton(textElement.value);
    });
    nameElement.addEventListener('click', () => {
      letClearForm(nameElement);
    });
    textElement.addEventListener('click', () => {
      letClearForm(textElement);
    });

    buttonElement.addEventListener('click', sentComment);

    document.addEventListener('keyup', (e) => {
     if (e.code === 'Enter') {
       sentComment();
     }
    })

    initUpdateLike(commentArray); 
    initAnswerComment(); 
  }

  

 