
import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { dracula } from '@uiw/codemirror-theme-dracula';



const Editor = () => {
  
    
  
  return (
    <div style={{height:'100vh',width:'100vw'}}>
    <CodeMirror
      value="// Type your code here"
      height="100%"
      width="100%"
      
      extensions={[javascript()]}
      theme={dracula}
      onChange={(value) => console.log(value)}
    />
    </div>
  );
};
export default Editor;

   