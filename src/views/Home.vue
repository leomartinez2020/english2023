<template>
    <div class="">
        <h1 class="text-3xl font-bold text-blue-700">All Listening Activities</h1>
        <router-link
            v-for="activity in activities"
            :key="activity.id"
            :to="activity.slug"
        >
        <h2>{{ activity.title }}</h2>
        <!-- <p><a :href="activity.url">Audio</a></p> -->
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
