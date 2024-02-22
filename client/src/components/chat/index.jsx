import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
  ChatHeader,
  Avatar,
} from "react-chat-engine-advanced";
import Header from "@/components/customHeader";
import StandardMessageForm from "@/components/customMessageForms/StandardMessageForm";
import Ai from "@/components/customMessageForms/Ai";
import AiCode from "@/components/customMessageForms/AiCode";
import AiAssist from "@/components/customMessageForms/AiAssist";
import {  useCookies } from 'react-cookie'



const LogOutButton = ({ onClick }) => {
  const [cookies,setCookie] = useCookies(['token']);
  return (
    <button className="ce-default-button ce-chat-form-button button" onClick={() =>{
      setCookie("token", null)
      window.location.reload()
      }}>Log Out</button>
  );
};


const Chat = ({ user, secret }) => {
  
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  );
 
  return (
    
    <div style={{ flexBasis: "100%" }}>
   
      <MultiChatSocket {...chatProps} />

      
      <MultiChatWindow
      
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />      
        }
        renderChatAvatars={(chat) =>  <div style={{display:"flex", justifyContent: "space-between", padding: 15}}>
        <Avatar username={chat.username}  />
        <LogOutButton/> 
        </div>
          }
        renderMessageForm={(props) => {
          
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiCode_")) {
            return <AiCode props={props} activeChat={chatProps.chat} />;
          }
          if (chatProps.chat?.title.startsWith("AiAssist_")) {
            return <AiAssist props={props} activeChat={chatProps.chat} />;
          }
       

          return (
            
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
