import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const res = await fetch("https://www.visit-x.net/rest/v1/recruiting/messenger/channel/1234", {
        method: "GET",
        headers: {
          "cache-control": "no-cache",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessages(data.data.messages);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = async (req, res) => {
    try {
      const response = await fetch(
        "https://www.visit-x.net/rest/v1/recruiting/messenger/channel/1234",
        {
          method: "POST",
          headers: {
            "cache-control": "no-cache",
            "Content-Type": "application/json; charset=utf8",
          },
          body: JSON.stringify({ text: message }),
        }
      );

      if (response.status >= 400) {
        return res.status(400).json({
          error: "There was an error",
        });
      }

      return res.status(200).json({ success: "ok" });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMessages();
  }, [messages]);

  return (
    <>
      <Head>
        <title>campoint Messenger</title>
        <link rel="stylesheet" href="css/reset.css" />
        <link rel="stylesheet" href="css/sidebar.css" />
        <link rel="stylesheet" href="css/messenger.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <div class="sidebar">
        <div class="sidebar__item">
          <img src="sidebar/logo.png" alt="campoint AG" />
        </div>
      </div>

      <div class="messenger">
        <div class="messenger__frame">
          <header class="messenger__header">
            <div class="messenger__header__wrapper">
              <img class="messenger_header__arrow-icon" src="./icons/arrow.svg" />
              <div class="messenger__header__body">
                <div class="messenger__header__chat-name">Julia's Groupchat</div>
                <div class="messenger__header__people-online">3 People online</div>
              </div>
              <div></div>
            </div>
          </header>

          <div class="messenger__members">
            <div class="messenger__members__wrapper">
              <div></div>
              <div class="messenger__members__body">
                <div>
                  <img class="messenger__members__user-img-0" src="./users/1.jpg" />
                  <img class="messenger__members__user-img-1" src="./users/2.jpg" />
                  <img class="messenger__members__user-img-2" src="./users/3.jpg" />
                  <img class="messenger__members__user-img-3" src="./users/4.jpg" />
                </div>
              </div>
              <img class="messenger_header__arrow-icon" src="./icons/plus.svg" />
            </div>
          </div>

          <div class="messenger__message-list">
            <div class="messenger__message-list__wrapper">
              {messages
                .map((message, index) => {
                  return (
                    <div class="messenger__message-list__item">
                      <img
                        class={`messenger__message-list__item__user-img-${index}`}
                        src={`./users/${index + 1}.jpg`}
                      />
                      <div class={`messenger__message__body-user-${index}`}>
                        <div class="messenger__message-list__item__meta-info">
                          {message.user.name} {message.sentAt}{" "}
                        </div>
                        <div class="messenger__message-list__item__message">{message.text}</div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>

          <div class="messenger__action-bar">
            <div class="messenger__action-bar-wrapper">
              <input
                class="messenger__action-bar__input"
                type="text"
                title="Message"
                onChange={(e) => setMessage(e.target.value)}
              />
              <img class="messenger__action-bar__smiley-icon" src="./icons/smiley.svg" />
              <button
                class="messenger__action-bar__btn btn btn--primary"
                type="button"
                onClick={sendMessage}
              >
                <img src="./icons/submit.svg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
