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
              <form @submit.prevent="addTask">
                <div class="form-group">
                  <input type="text" v-model="task.title" class="form-control" placeholder="Inserte una nueva tarea">
                </div>
                <div class="form-group">
                  <textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="Inserta una descripción de la tarea"></textarea>
                </div>
                <button class="btn btn-primary btn-block">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
class Task {
  constructor(title, description) {
    this.title = title
    this.description = description
  }
}

export default {
  data() {
    return {
      task: new task()
    }
  },
  methods: {
    addTask() {
      fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.Task),
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
      
      this.task = new Task()
    }
  }
}
</script>
