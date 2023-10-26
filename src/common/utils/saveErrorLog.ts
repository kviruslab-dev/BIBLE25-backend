import axios from 'axios';

export const saveErrorLog = async (
  status_code: number,
  method: string,
  url: string,
  error: string,
) => {
  await axios({
    method: 'post',
    //! 현재는 하드코딩. url 처리 고민하기 (현재 실행중인 url을 사용할 수 있도록)
    url: 'http://localhost:3000/log/error',
    data: {
      status_code,
      method,
      url,
      error,
    },
    headers: {
      'Content-type': 'application/json',
    },
  });
};
