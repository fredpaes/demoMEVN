<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <a href="/" class="navbar-brand">MEVN Demo</a>
    </nav>

    <div class="container">
      <div class="row pt-5">
        <div class="col-md-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="sendTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" class="form-control" placeholder="Inserte una nueva tarea">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="Inserta una descripción de la tarea"></textarea>
                </div>
                <button class="btn btn-primary btn-block">Guardar</button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-md-7">
          <table class="table table-borderer">
            <thead>
              <tr>
                <th>Tarea</th>
                <th colspan="2">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task of tasks">
                <td>{{ task.title }}</td>
                <td>{{ task.description }}</td>
                <td>
                  <button @click="deleteTask(task._id)" class="btn btn-danger">Borrar</button>
                  <button @click="editTask(task._id)" class="btn btn-primary">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}

export default {
  data() {
    return {
      task: new Task(),
      tasks: [],
      isEditing: false,
      taskToEdit: ''
    }
  },
  created() {
    this.getTasks();
  },
  methods: {
    sendTask() {
      if (this.isEditing) {
        fetch(`/api/tasks/${this.taskToEdit}`, {
          method: 'PUT',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          this.getTasks();
          this.isEditing = false;
          this.taskToEdit = '';
        })
      } else {
        fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(this.task),
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => this.getTasks())
      }

      this.task = new Task();
    },
    getTasks() {
      fetch('/api/tasks')
      .then(res => res.json())
      .then(data => this.tasks = data.data)
    },
    deleteTask(id) {
      fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => this.getTasks())
    },
    editTask(id) {
      fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then(data => {
        this.task = new Task(data.data.title, data.data.description);
        this.isEditing = true;
        this.taskToEdit = data.data._id;
      })
    }
  }
}
</script>
