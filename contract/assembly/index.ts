import {PersistentVector} from 'near-sdk-as'

let tasks = new PersistentVector<string>('task');

export function addTask(task: string): void {
  tasks.push(task);
}

export function getTasks(): Array<string>|null {
  let list = new Array<string>();
  let i: i32 = 0;
  while (i < tasks.length) {
    list.unshift(tasks[i])
    i++
  }
  return list;
}

export function deleteTask(task: i32): void {
   tasks.swap_remove(tasks.length-task-1);
}

