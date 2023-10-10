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
