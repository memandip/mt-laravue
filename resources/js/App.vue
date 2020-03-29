<template>
  <div id="app">
    <div class="heading">
      <h1>
        Cruds
        &nbsp;
        <button @click="create">Add</button>
      </h1>
    </div>

    <crud-component
      v-for="(crud, index) in cruds"
      v-bind="crud"
      :index="index"
      :key="crud.id"
      @update="update"
      @delete="del"
    ></crud-component>
    <div class="clearfix"></div>
  </div>
</template>

<script>
function Crud({ id, color, name }) {
  this.id = id;
  this.color = color;
  this.name = name;
}

let readUrl = "/api/cruds",
  createUrl = "/api/cruds/create",
  actionUrl = "/api/cruds/ID";

import CrudComponent from "./components/CrudComponent";

export default {
  data() {
    return {
      cruds: [],
      mute: false
    };
  },
  methods: {
    async create() {
      this.mute = true;
      const { data } = await axios.get(createUrl);
      this.cruds.push(new Crud(data));
      this.mute = false;
    },
    async read() {
      const { data } = await axios.get(readUrl);
      Array.from(data).map(crud => this.cruds.push(new Crud(crud)));
    },
    async update(id, color, name) {
      this.mute = true;
      await axios.put(actionUrl.replace(/ID/, id), { color, name });
      this.cruds.find(crud => crud.id == id).color = color;
      this.mute = false;
    },
    async del(id) {
      this.mute = true;
      await axios.delete(actionUrl.replace(/ID/, id));
      let index = this.cruds.findIndex(crud => crud.id === id);
      this.cruds.splice(index, 1);
      this.mute = false;
    }
  },
  created: function() {
    this.read();
  },
  watch: {
    mute(val) {
      document.getElementById("mute").className = val ? "on" : "";
    }
  },
  components: {
    CrudComponent
  }
};
</script>

<style>
#app {
  margin-left: 1em;
}
.heading h1 {
  margin-bottom: 0;
}
</style>