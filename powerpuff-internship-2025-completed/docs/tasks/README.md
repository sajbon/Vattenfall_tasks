# Overall explanation for tasks

You will receive a few tasks to do on your own. We hope that you will collaborate and help each other complete the tasks.

## How to complete task

1. Go to task list for FE or BE.
<img style="max-width:28rem" src="/images/task_list.png"/>

1. Click on `Expand details` to see description of the task
<img style="max-width:28rem" src="/images/task_expand.png"/>

You can see that tasks are containg few more sections: 

- Description - overall explenation of the task

- Expected outcome - what is expected as a result of completed task

- Tips - list of clues that mijght be helpfull for completing the task. Click on tip to show the answer.

3. Edit/add code to match expected outcome
4. If you are stuck ask your collegues, maybe they already figured it out. You can also ask our mentors for help :) List of people and competences can be found at the end of this file.  

## How to mark task as done
1. Open docs folder in project structure.
1. Find `completed_tasks.json` file.
1. After opening the file you will see following structure
```  
{
    "FE": {
        "completed_tasks": [
        {
            "task_id": 1,
            "task_name": "Favicon",
            "completed": false,
            "completion_date": ""
        },
        {
            "task_id": 2,
            "task_name": "Back to Home page button",
            "completed": false,
            "completion_date": ""
        },
            ...
        ]
    }
    "BE": {
        "completed_tasks": [
            ...
        ]
    }
}
```
As you can see it contains list of all tasks with id, name, completed flag and empty string for completion date.
1. Find task that you want to mark as completed.
1. Change completed property to `true`
1. Optionally add completion date.
1. Save file.
1. Go to tasks list
1. Refresh page (script that is visually marking tasks is running on load of whole documentation so to see marks you need to refresh docs after entering page with tasks)
1. You should be able to see which tasks are completed and which one are pending 

<img style="max-width:28rem" src="/images/example_marked_done.png"/>

## Where to find help

If we are in the office you are welcome to approach us. If it is remote day you can message us on teams and we can decide if call is needed or a hint via message will be enough. 

Who to contact in case of questions: 
- Frontend:
    - Joanna Krasucka
    - Katarzyna Stefaniak
    - Beata Rudzka

- Backend: 
    - Robert Sgodzaj
    - Rafał Walczak

- UX:
    - Łukasz Świstuń
    - Joanna Krasucka

- Business requirments:
    - Katarzyna Kurbańska
    - Kaja Owczarczyk 