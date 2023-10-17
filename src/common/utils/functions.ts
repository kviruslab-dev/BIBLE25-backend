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

export const convertArrayToStringMySQL = (arr: any, type: string) => {
  if (!Array.isArray(arr)) {
    return null;
  }

  if (type === 'columns') {
    return `'${arr.join('", "')}'`;
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
