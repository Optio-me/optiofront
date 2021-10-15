<script>
  export let checked = false;
</script>

<div class="flex">
  <label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider" />
  </label>

  <span class="label">Screen Reader</span>
</div>

<style>
  /* Re-write this */
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    border: 2px solid #8f8f8f;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 10px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 24px;
    left: -2px;
    border: 2px solid #8f8f8f;
    bottom: -2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 10px;
  }

  input:checked + .slider {
    background-color: #b6e7bd;
  }

  input:checked + .slider {
    box-shadow: 0 0 1px #b6e7bd;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(32px);
    -ms-transform: translateX(32px);
    transform: translateX(32px);
  }

  .label {
    margin-left: 20px;
  }
</style>
