<template>
  <div class="baseLayout">
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" @click="$router.push({name: 'DocumentList'})">
          <h2>Documents App</h2>
        </a>
      </div>
    </nav>
    <div class="container" id="main_container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>

<style>
  #main_container{
    padding-top: 15px;
  }
</style>
