/**
 * Lists task items for a provided tasklist ID.
 * @param  {string} taskListId The tasklist ID.
 */
function listTasks() {
  var taskListId = 'MDE2MjAxMzI4ODY0Mzg2NDI5MDE6MTk1NzcxOTkzNTM5ODI1MjYyNDk6MA';
  
  var optionalArgs = {
    showCompleted: true,
    showDeleted: true,
    showHidden: true
  };
  var tasks = Tasks.Tasks.list(taskListId,optionalArgs);
  
  if (tasks.items) {
    for (var i = 0; i < tasks.items.length; i++) {
      var task = tasks.items[i];
      console.log('[ Task - id:"%s" , title:"%s", status:"%s", completed:"%s" , deleted:"%s", hidden:"%s".',
                 task.id, task.title, task.status, task.completed, task.deleted, task.hidden);
    }
  } else {
    console.log('No tasks found.');
  }
}