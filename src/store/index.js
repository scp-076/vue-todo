import {createStore} from 'vuex';

export default createStore({
	state: {
		tasks: JSON.parse(localStorage.getItem('tasks') || '[]').map(task => {
			if (new Date(task.date) < new Date()) task.status = 'outdated';
			return task;
		}),
	},
	mutations: {
		createTask(state, task) {
			state.tasks.push(task);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		updateTask(state, {id, description, date}) {
			const updatedTask = state.tasks.find(t => t.id === id);
			const updatedTaskId = state.tasks.indexOf(updatedTask);
			const status = new Date(date) > new Date() ? 'active' : 'outdated';
			state.tasks[updatedTaskId] = {...updatedTask, description, date, status};
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		completeTask(state, id) {
			const idx = state.tasks.findIndex(t => t.id === id);
			state.tasks[idx].status = 'completed';
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
		deleteTask(state, id) {
			state.tasks = state.tasks.filter(t => t.id !== id);
			localStorage.setItem('tasks', JSON.stringify(state.tasks));
		},
	},
	actions: {
		createTask({commit}, task) {
			commit('createTask', task);
		},
		updateTask({commit}, task) {
			commit('updateTask', task);
		},
		completeTask({commit}, id) {
			commit('completeTask', id);
		},
		deleteTask({commit}, id) {
			commit('deleteTask', id);
		}
	},
	modules: {},
	getters: {
		tasks: state => state.tasks,
		getTask: state => id => state.tasks.find(t => t.id === id),
	},
});
