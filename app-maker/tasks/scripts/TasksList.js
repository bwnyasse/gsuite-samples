/*
 * Method used to created a new task list in Google Task ( GT )
 * 
* @param {title} the title to give
* @return {id} - the task list id
 */
function createTaskListGT(title) {
    
  // TaskList resource : https://developers.google.com/tasks/v1/reference/tasklists#resource
  var resource = Tasks.newTaskList();
  resource.title = title;
  
  
  var createdTaskList = Tasks.Tasklists.insert(resource);
  if(createdTaskList !== null) {
    console.log("Successful created new taskList id:",createdTaskList.id," title:" , title);
  }
  return createdTaskList.id;
}


/**
* Method used to retrieve the id of a tasklist by the given title
* 
* @param {title} the title to give
* @return {id} - the task list id
*/
function queryGetTaskListIdByTitle(title) {
   
  console.log("Prepare queryGetTaskListIdByTitle with title:",title);
 
  var allQuery = app.models.TasksList.newQuery();
  var allTaskList = allQuery.run();
  console.log("Size of tasklist ",allTaskList.length.toFixed());
  if(allTaskList.length.toFixed() > 0) {
    var query = app.models.TasksList.newQuery();
    query.filters.title._equals = title;

    var taskList = query.run()[0];

    if(taskList !== null) {
      console.log("Successfully retrieve the element with title: ",title);
      return taskList.taskListId;
    } else {
      console.warn("We are not able to query the tasklist by title. Maybe the last list is not present in GT");
      return "";    
    }

  }

  console.log("No Task list - must create one");
  return "";

}

function queryCreateTaskListByTitle(title) {
    
    var taskListId = createTaskListGT(title);
    console.log("Create Task list in GT");
    
    var newRecord = app.models.TasksList.newRecord();
    newRecord.title  = title;
    newRecord.taskListId = taskListId;
    console.log("Attemp to create with title ",title," and task list id ",taskListId);
    app.saveRecords([newRecord]);
    console.log("Create Task list in Cloud SQL");
    return taskListId;
  
}


/**
* Method used to ensure to create a new task list in Google Task
* If the tasklist alread exists , don't create it , otherwise create it.
*
* @param {title} the title to give
* @return {id} - the task list id
**/
function ensureCreateTaskListGT(title) {
  
  var id = queryGetTaskListIdByTitle(title);
  
  // Check if the id is empty, create a new one
  if(id === ""){
    console.log("Attemp to create a new task list with title:", title);
    return queryCreateTaskListByTitle(title);
  }
  
  return id;
}