const Task = (props) => Component({
  id: props.id,
  state: {},

  render() {
    const { checked, name, id } = props;

    return (
      li({ id },
        label(
          input({
            type: 'checkbox',
            onClick: () => props.onClick(this.id),
            checked
          }),
          checked ? s(name) : name
        )
      )
    );
  },
});

const TaskList = (props) => Component({
  id: props.id,
  state: {
    tasks: props.tasks
  },

  handleTaskClick(id) {
    const tasks = this.state.tasks.slice();
    const task = tasks.find(task => task.id === id);

    tasks.splice(tasks.indexOf(task), 1);

    this.setState({
      tasks: [
        ...tasks,
        Object.assign(task, { checked: !task.checked })
      ]
    });
  },

  render() {
    const onClick = this.handleTaskClick.bind(this);
    const { tasks } = props;

    return (
      ul(
        ...tasks.map(
          task => Task(Object.assign({ onClick }, task))
        )
      )
    );
  },
});

const TodoApp = (props) => Component({
  id: props.id,
  state: {
    tasks: [
      { id: 1, checked: false, name: 'Do laundry' },
      { id: 2, checked: false, name: 'Wash dishes' },
      { id: 3, checked: false, name: 'Try creating prepreact' },
    ],
    newTask: { checked: false, name: '' }
  },

  addTask() {
    const { tasks, newTask } = this.state;

    this.setState({
      tasks: [
        ...tasks,
        Object.assign({ id: tasks.length + 1 }, newTask)
      ],
      newTask: { checked: false, name: '' }
    })
  },

  onInputChange({ target }) {
    this.setState({
      newTask: { checked: false, name: target.value }
    });
  },

  render() {
    const { newTask, tasks } = this.state;

    return (
      section(
        TaskList({ id: 'task-list', tasks }),
        input({ type: 'text', onChange: this.onInputChange.bind(this), value: newTask.name }),
        button({ onClick: this.addTask.bind(this) }, 'add')
      )
    );
  },
});

document.body.appendChild(
  TodoApp({ name: 'todo' })
);
