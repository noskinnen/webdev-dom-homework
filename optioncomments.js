import { regUser, loginUser, sentDataServer, fetchComments } from "./api.js";
import { renderApp } from "./render.js";
import { letClearForm } from "./changeelement.js";

    const initUpdateLike = (commentArray) => {
      const likeButtonsElements = document.querySelectorAll('.like-button');

      for (const likeButtonsElement of likeButtonsElements) {
        likeButtonsElement.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = likeButtonsElement.dataset.index; 
          if (likeButtonsElement.classList.contains('-active-like')) {
            commentArray[index].likes = Number(commentArray[index].likes)-1;
          } else {
            commentArray[index].likes = Number(commentArray[index].likes)+1;
          }
          commentArray[index].isActiveLike = !commentArray[index].isActiveLike;
          renderApp(commentArray);
        })
      }
    };

    const initAnswerComment = () => {
      const textElement = document.getElementById("input-text");
      const oldComments = document.querySelectorAll('.comment')
      for (const oldComment of oldComments) {
        oldComment.addEventListener('click', () => {
          textElement.value = `> ${oldComment.querySelector('.comment-text').innerHTML
          .replaceAll("&amp;" , "&")
          .replaceAll("&lt;" , "<")
          .replaceAll("&gt;" , ">")
          .replaceAll("&quot;" , '"')}`
          + `\n\n${oldComment.querySelector('.comment-header').children[0].innerHTML
          .replaceAll("&amp;" , "&")
          .replaceAll("&lt;" , "<")
          .replaceAll("&gt;" , ">")
          .replaceAll("&quot;" , '"')}`
        })
      }
    }

    export const sentComment = () => {
        const nameElement = document.getElementById("input-name");
        const textElement = document.getElementById("input-text");
        const formComment = document.querySelector('.add-form');
        const messageComment = document.querySelector('.text-wile');
        letClearForm(nameElement);
        letClearForm(textElement);
    
          if (nameElement.value === '') {
            nameElement.classList.add('error');
            if (textElement.value === '' || textElement.value === '\n') {
              textElement.classList.add('error');
            }
            return;
          }
          if (textElement.value === '' || textElement.value === '\n') {
            textElement.classList.add('error');
            return;
        }
    
        formComment.classList.add('dpnone');
        messageComment.classList.remove('dpnone');

        sentDataServer()

      };

      export const userAuthorization = (setToken, setUser) => {
        const login = document.getElementById('loginReg').value;
        const password = document.getElementById('passwordReg').value;
        if (!login) {
          alert('Введите логин');
          return;
        }
        if (!password) {
          alert('Введите пароль');
          return;
        }
        loginUser(login, password)
        .then((user) => {
          setToken(`Bearer ${user.user.token}`);
          setUser(user.user.name);
          fetchComments();
        })
        .catch((error) => {
          alert(error.message);
        })
      }

      export const userRegistration = (setToken, setUser) => {
        const login = document.getElementById('loginReg').value;
        const password = document.getElementById('passwordReg').value;
        const name = document.getElementById('nameReg').value;
        if (!name) {
          alert('Введите имя');
        }
        if (!login) {
          alert('Введите логин');
          return;
        }
        if (!password) {
          alert('Введите пароль');
          return;
        }
        regUser(login, password, name)
        .then((user) => {
          setToken(`Bearer ${user.user.token}`);
          setUser(user.user.name);
          fetchComments();
        })
        .catch((error) => {
          alert(error.message);
        })
      }

    export {initUpdateLike, initAnswerComment} 