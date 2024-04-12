export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export const getNDaysAgo = (N: number) => {
  const date = new Date();
  date.setDate(date.getDate() - N);
  const year = date.getFullYear();
  const month = ('0' + (1 + date.getMonth())).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return year + '-' + month + '-' + day;
};

export const transformDate = (arr: any) => {
  const transformedArr = arr.map((item: any) => {
    const dateOnly = new Date(item.createAt).toISOString().split('T')[0];
    return {
      createAt: dateOnly,
      phone: item.phone,
      comment: item.comment,
    };
  });

  return transformedArr;
};

export const convertArrayToString = (arr: any, type: string) => {
  if (!Array.isArray(arr)) {
    return null;
  }

  if (type === 'columns') {
    return `"${arr.join('", "')}"`;
  }

  if (type === 'values') {
    const convertedArr = arr.map((item) => {
      return typeof item === 'string' ? `'${item}'` : item;
    });

    return convertedArr.join(', ');
  }
};

export const formatKeyValuePairs = (keys: any[], values: any[]) => {
  if (
    !Array.isArray(keys) ||
    !Array.isArray(values) ||
    keys.length !== values.length
  ) {
    return 'Invalid input: Keys and values must be arrays of the same length.';
  }

  const formattedPairs = keys
    .map((key, index) => {
      const value =
        typeof values[index] === 'number'
          ? values[index]
          : `'${values[index]}'`;
      return `${key} = ${value}`;
    })
    .join(', ');

  return formattedPairs;
};

export const arrayToFormattedString = (arr: number[]) => {
  if (!Array.isArray(arr)) {
    return 'Input is not an array.';
  }

  if (arr.length === 0) {
    return '()';
  }

  const formattedString = `(${arr.join(',')})`;
  return formattedString;
};

export const stringToArray = (str: string | undefined) => {
  if (typeof str === 'undefined') {
    return [];
  }

  if (typeof str !== 'string') {
    throw new Error('Input is not a string.');
  }

  return str.split(' ');
};

//! 광고 순서 변경을 위한 함수들입니다.
export const reorderArray = (arr01: any) => {
  //! 길이가 0인 경우, 그대로 반환
  if (arr01.length === 0) {
    return arr01;
  }

  //! 길이가 7 이상인 경우, 그대로 반환
  if (arr01.length >= 7) {
    return arr01;
  }

  //! 길이가 1이상 6이하인 경우
  const arr02 = orderArray(arr01.length);

  const result = [];
  for (let i = 0; i < arr02.length; i++) {
    const index = arr02.indexOf(i + 1); // arr2에서 현재 인덱스의 위치를 찾습니다.
    if (index === -1) {
      throw new Error(
        'Second array must contain values 1, 2, 3, ... in some order',
      );
    }
    result.push(arr01[index]); // arr1에서 해당 위치의 요소를 결과 배열에 추가합니다.
  }
  return result;
};

export const orderCase = {
  1: { 1: [1] },
  2: { 1: [1, 2], 2: [2, 1] },
  3: { 1: [1, 2, 3], 2: [2, 3, 1], 3: [3, 1, 2] },
  4: { 1: [1, 2, 3, 4], 2: [2, 3, 4, 1], 3: [3, 4, 1, 2], 4: [4, 1, 2, 3] },
  5: {
    1: [1, 2, 3, 4, 5],
    2: [2, 3, 4, 5, 1],
    3: [3, 4, 5, 1, 2],
    4: [4, 5, 1, 2, 3],
    5: [5, 1, 2, 3, 4],
  },
  6: {
    1: [1, 2, 3, 4, 5, 6],
    2: [2, 3, 4, 5, 6, 1],
    3: [3, 4, 5, 6, 1, 2],
    4: [4, 5, 6, 1, 2, 3],
    5: [5, 6, 1, 2, 3, 4],
    6: [6, 1, 2, 3, 4, 5],
  },
};

export const getRandomNumberUpToN = (n: number) => {
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error('n must be a positive integer.');
  }

  // 1부터 n까지의 자연수 중에서 무작위로 하나를 선택
  const randomValue = Math.floor(Math.random() * n) + 1;

  return randomValue;
};

export const orderArray = (len: number) => {
  return orderCase[len][getRandomNumberUpToN(len)];
};
