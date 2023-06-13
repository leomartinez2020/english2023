<template>
    <div class="">
        <h1 class="text-3xl font-bold text-blue-700">All Listening Activities</h1>
        <router-link
            v-for="activity in activities"
            :key="activity.id"
            :to="activity.slug"
        >
        <h2 class="my-4 hover:text-blue-300 hover:font-bold">{{ activity.title }}</h2>
        </router-link>
    </div>
</template>

<script>
import mydata from '@/datos.json'
export default {
    data() {
        return {
            activities: mydata.activities
        }
    }
}
</script>
