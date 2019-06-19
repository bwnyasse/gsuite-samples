/**
* Transform a task record to a google task resource
* 
*
*/
function taskRecordToGoogleTaskResource(record) {
  
  // https://stackoverflow.com/questions/49763474/how-to-set-google-tasks-due-date
  var dueDate = Utilities.formatDate(record.due, "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
  return {
    title: record.title,
    notes: record.details,
    due: dueDate
  };
}

/**
 * Adds a task to a tasklist into Google Tasks App.
 * The purpose is to create the task with his corresponding id from Cloud SQL.
 *
 * @param {record} the created record.
 */
function addTaskInGoogleTasks(record) {

  var title = record.title;
  var taskListId = record.taskListId;
  
  console.log("Attemp to created the task title", title);

  // Prepare the tasks
  var task = taskRecordToGoogleTaskResource(record);

  task = Tasks.Tasks.insert(task, taskListId);
  console.log('Task with ID "%s" was created.', task.id);
  record.taskId = task.id;
}

function onBeforeDeleteTaskInterceptor(record){
 Tasks.Tasks.remove(record.taskListId,record.taskId);
}

/**
*
*
* @param record - the task record to create
* @param title - the task list title
*/
function onBeforeCreateTaskInterceptor(record, title) {
  var taskListId = ensureCreateTaskListGT(title) ;

  // Update the record
  record.taskListId = taskListId;

  // Add Task into Google Task
  addTaskInGoogleTasks(record);
}



