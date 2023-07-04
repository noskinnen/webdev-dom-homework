import { comments } from "./index.js";
import { sentComment } from "./optioncomments.js";
import { convertServer } from "./convertserver.js";
import { token } from "./autorization.js";

export function fetchComments(){
   return fetch("https://wedev-api.sky.pro/api/v2/Andrey-Nosov/comments", {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      convertServer(response, comments);
    })
  };

export function sentDataServer(){
  const nameElement = document.getElementById("input-name");
  const textElement = document.getElementById("input-text");
  const formComment = document.querySelector('.add-form');
  const messageComment = document.querySelector('.text-wile');
  const protectionHtml = (string) => {
    return string 
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
  };
   return fetch("https://wedev-api.sky.pro/api/v2/Andrey-Nosov/comments", {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          name: protectionHtml(nameElement.value),
          text: protectionHtml(textElement.value),
          forceError: true,
        })
      }).then((response) => {
        if (response.status === 201) {
          nameElement.classList.remove('error');
          textElement.classList.remove('error');
          return response.json();
        } else if (response.status === 400) {
          throw new Error ('Плохой запрос')
        } else if (response.status === 500) {
          throw new Error ('Сервер упал')
        } 
      })
      .then(() => {
        formComment.classList.remove('dpnone');
        messageComment.classList.add('dpnone');
        nameElement.value = '';
        textElement.value = '';
        fetchComments()
      }).catch((error) => {
        formComment.classList.remove('dpnone');
        messageComment.classList.add('dpnone');
        if (error.message === 'Плохой запрос') {
          alert('Вы ввели слишком короткое имя или комментарий')
          return
        }
        if (error.message === 'Сервер упал') {
          alert('Извините сервер не доступен')
          return
        }
        else {
          alert('Нет интернета')
          return 
        }
        sentComment();
      })
    };
export function loginUser(login, password) {
  return fetch('https://wedev-api.sky.pro/api/user/login', {
      method: "POST",
      body: JSON.stringify({
          login,
          password,
      }),
  })
      .then((response) => {
          if (response.status === 400) {
              throw new Error('Неверный логин или пароль');
          }
          return response.json();
      });
}

export function regUser(login, password, name) {
  return fetch('https://wedev-api.sky.pro/api/user', {
      method: "POST",
      body: JSON.stringify({
          login,
          password,
          name
      }),
  })
      .then((response) => {
          if (response.status === 400) {
              throw new Error('Такой пользователь уже существует');
          }
          return response.json();
      });
}