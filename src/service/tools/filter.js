export const filterTasks = (filter, array) => {
  const filterTasks = array.filter(
    (task) => task?.Estado?.toLocaleLowerCase() === filter.toLocaleLowerCase()
  );
  return filterTasks;
};
