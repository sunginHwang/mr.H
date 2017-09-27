import React from 'react';
  
const BoardTodo = ({
    handleButtonClick,
    author
}) => {
    return(
      <div>Router Example
          <button onClick={handleButtonClick}>redux-pender action success : {author}</button>
      </div>
    );
}; 
export default BoardTodo;