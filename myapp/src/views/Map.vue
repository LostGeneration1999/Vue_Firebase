<template>
    <div>
        <h2>Map</h2>
        <hr>
        <h1>MAp {{$route.params.id }}</h1>
    </div>
</template>

<script>
export default {
    props: ['data']
}
</script>