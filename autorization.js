import { userAuthorization, userRegistration } from "./optioncomments.js";

export let token = null;
export let currentUser = null;

export function renderLogin (appElement, fetchComments) {
    let isLoginMode = true;
    const appHtml = `
    <ul class="comments" id="comment-list">
        Пожалуйста подождите,комментарий загружается...
      </ul>
      <p>Чтобы добавить комментарий, <a href="#" id="toogleLink">Авторизуйтесь</a></p>`;
      
      appElement.innerHTML = appHtml;
      fetchComments();
      document.getElementById('toogleLink').addEventListener('click', () => {
        renderForm();
      })

      const renderForm = () => {
        appElement.innerHTML = `
        <div class="add-form">
        <h3>Форма ${isLoginMode ? 'входа' : 'регистрация'}</h3>
        ${isLoginMode ? ' ' : `<input type="text" class="add-form-text" placeholder="Введите ваше имя" id="nameReg"><br>`}
        <input type="text" class="add-form-text" placeholder="Введите ваш логин" id="loginReg">
        <br>
        <input type="password" class="add-form-text" placeholder="Введите пароль" id="passwordReg">
        <button class="add-form-button" id="add-button-reg">${isLoginMode ? 'Войти' : 'Зарегистрировать'}</button>
        <br>
        <a href="#" id="toogleRegLink" class="text-regLink">${isLoginMode ? 'Зарегистрироваться' : 'Войти'}</a>
      </div>`
      document.getElementById('toogleRegLink').addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        renderForm();
      })
      document.getElementById('add-button-reg').addEventListener('click', () => {
        if (isLoginMode) {
          userAuthorization((newToken) => {
            token = newToken;
          }, (newUser) => {
            currentUser = newUser
          })
        } else {
          userRegistration((newToken) => {
            token = newToken;
          }, (newUser) => {
            currentUser = newUser
          })
        }
      })
      }  

}