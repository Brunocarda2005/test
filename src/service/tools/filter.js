export const filterTasks = (filter, array) => {
  if (array.message) return [];

  if (array.length === 0) return array;

  const filterTasks = array?.filter(
    (task) => task?.Estado?.toLocaleLowerCase() === filter.toLocaleLowerCase()
  );
  return filterTasks;
};
