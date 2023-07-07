import {renderComments, renderApp} from './render.js';
import { token } from './autorization.js';
import { format } from 'date-fns';

export const convertServer = (response, commentArray) => {
    response.json().then((responseData) => {
        commentArray = responseData.comments; 
        commentArray = commentArray.map((item) => {
          const formatDate = format(new Date(item.date), 'dd/MM/yyyy hh:mm')
        return {
          name: item.author.name, 
          date: formatDate,
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