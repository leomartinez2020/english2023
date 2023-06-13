<template>
  <h1 class="text-xl text-gray-700">{{ activity.title }}</h1>
  <h2 class="text-lg text-blue-700">Activity {{ activityId }}</h2>
  <audio controls>
    <source :src="activity.audiosrc" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <div v-for="question in activity.questions">
      <p>{{ question.text }}</p>
      <ol class="list-disc">
        <li v-for="option in question.options">{{ option }}</li>
      </ol>
  </div>    
</template>

<script>
import mydata from '@/datos.json'

export default {
  data() {
    return {
      selectedOptions: new Array(this.numberOfQuestions).fill(null),
      submitted: false,
      results: false,
      correctAnswers: 0,
    }
  },
  computed: {
    activityId() {
      return parseInt(this.$route.params.id)
    },
    activity() {
      return mydata.activities.find(dato => dato.id === this.activityId)
    },
    numberOfQuestions() {
      return this.activity.questions.length;
    },
    //allQuestionsAnswered() {
      //return this.selectedOptions.every(option => option !== null);
    //}
  },
  methods: {
    isCorrect(questionIndex, optionIndex) {
      return this.activity.questions[questionIndex].answerIndex === optionIndex;
    },
    isSelected(questionIndex, optionIndex) {
      return this.selectedOptions[questionIndex] === optionIndex;
    },
    checkAnswer() {
      this.submitted = true;
      let correctAnswers = 0;
      for (let i = 0; i < this.numberOfQuestions; i++) {
        if (this.selectedOptions[i] === this.activity.questions[i].answerIndex) {
          correctAnswers++;
        }
      }
      this.correctAnswers = correctAnswers;
      this.results = true;
    },
    resetForm() {
      this.submitted = false;
      this.selectedOptions = new Array(this.numberOfQuestions).fill(null);
      this.results = false;
      this.correctAnswers = 0;
    },
  },
}
</script>
