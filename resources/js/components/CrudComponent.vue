<template>
  <div class="crud">
    <div class="col-md-1">
      <img :src="image" />
    </div>
    <div class="col-md-11">
      <p>
        <strong>Name:</strong>
        <span contenteditable="true" data-type="name" @blur="update">{{ name | properCase }}</span>
      </p>
      <p>
        <strong>Color:</strong>
        <select @change="update" data-type="color">
          <option
            v-for="col in ['red', 'green']"
            :value="col"
            :key="col"
            :selected="col === color ? 'selected' : ''"
          >{{ col | properCase }}</option>
        </select>
      </p>
      <br />
      <button @click="del">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    image() {
      return `/images/${this.color}.png`;
    }
  },
  methods: {
    update(e) {
      let type = e.target.getAttribute("data-type"),
        color = this.color,
        name = this.name;

      switch (type) {
        case "name":
          name = e.target.textContent;
          break;
        case "color":
          this.color = e.target.selectedOptions[0].value;
          break;
      }

      this.$emit("update", this.id, color, name);
    },
    del() {
      if (!confirm("Are you sure ??")) return;
      this.$emit("delete", this.id);
    }
  },
  created: function() {
    // console.log('name', this.name)
    // this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1)
  },
  props: ["id", "color", "name"],
  filters: {
    properCase(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style>
.crud {
  display: flex;
  margin: 1em 1em 1em 0;
  border: 1px solid #d1d1d1;
  padding: 1em;
  width: 28%;
  background-color: white;
  float: left;
}
.crud img {
  height: 70px;
}
.col-2 {
  margin-left: 1em;
}
.col-2 > h3 {
  margin: 0.5em 0;
}
</style>