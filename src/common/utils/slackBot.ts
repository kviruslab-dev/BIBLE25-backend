import axios from 'axios';

export const sendMessageToSlack = async (message: string) => {
  await axios({
    method: 'post',
    url: 'https://slack.com/api/chat.postMessage',
    data: {
      channel: `${process.env.SLACK_CHANNEL}`,
      text: message,
    },
    headers: {
      'Content-type': 'application/json',
      //
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    },
  });
};
