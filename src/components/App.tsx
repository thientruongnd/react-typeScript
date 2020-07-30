/**
Mr : Dang Xuan Truong
Email: truongdx@runsystem.net
*/
import * as React from 'react';

interface IsState {
	currentTask: string;
	tasks: Array<ItemTask>
}
interface ItemTask {
	id: number,
	value: string,
	completed: boolean
}
class App extends React.Component<{}, IsState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			currentTask : "",
			tasks : [],
		}
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>): void=>{
		e.preventDefault();
		this.setState({
			currentTask:"",
			tasks : [
				...this.state.tasks,
				{
					id: this._timeInMilliseconds(),
					value: this.state.currentTask,
					completed: false
				}

			],
		})
		console.log(e);
	};

	deleteTask = (id: number): void =>{
		const tasks: Array<ItemTask> = this.state.tasks.filter((task: ItemTask)=>{
			return task.id !== id;
		});
		this.setState({tasks})
	}

	toggleDone = (i: number): void=>{
		let task: ItemTask[] = this.state.tasks.splice(i, 1);
		task[0].completed = !task[0].completed;
		const tasks : ItemTask[] = [...this.state.tasks, ...task];
		this.setState({tasks});
	}

	renderTasks = (): JSX.Element[]=>{
		return this.state.tasks.map((task: ItemTask, index: number)=>{
			return (
				<div key={task.id} className="tdl-task">
					<span className={task.completed ? "is-completed": ""}>{task.value}</span>
					<button onClick={() => this.deleteTask(task.id)}>Delete</button>
					<button onClick={()=>this.toggleDone(index)}>{task.completed?"Undo":"Done"}</button>
				</div>
			)
		})
	};

	_timeInMilliseconds = ():number =>{
		const date: Date = new Date();
		return date.getTime();
	};

	render(): JSX.Element {
		console.log(this.state)
		return (
			<div>
				<h1>Hello Trường</h1>
				<form onSubmit={(e)=>this.handleSubmit(e)}>
					<input  type="text" placeholder="Add Task"
					        className="tdl-input"
					        value={this.state.currentTask}
					        onChange={(e)=> this.setState({currentTask: e.target.value})}
					/>
					<button type="submit">Add task</button>
				</form>
				<section>
					{this.renderTasks()}
				</section>
			</div>
		);
	}
}

export default App;
