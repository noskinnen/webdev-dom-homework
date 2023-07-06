import {renderComments, renderApp} from './render.js';
import { token } from './autorization.js';

export const convertServer = (response, commentArray) => {
    response.json().then((responseData) => {
        commentArray = responseData.comments; 
        commentArray = commentArray.map((item) => {
        return {
          name: item.author.name, 
          date: new Date(item.date),
          text: item.text,
          likes: item.likes,
          isActiveLike: item.isLiked,
          id: item.id,
        }
      }) 
      if (!token) {
        renderComments(commentArray);
      } else renderApp(commentArray)
    })
  }