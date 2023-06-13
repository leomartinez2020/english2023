<template>
  <h2 class="text-lg text-blue-700">Activity {{ activityId }}</h2>
  <h1 class="text-xl text-gray-700">{{ activity.title }}</h1>
  <audio controls>
    <source :src="activity.audiosrc" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <div v-for="(question, index) in activity.questions" :key="index">
      <p class="font-bold">{{ question.text }}</p>
      <ul>
        <li v-for="(option, optionIndex) in question.options" :key="optionIndex">
          <label :class="{ 'selected': isSelected(index, optionIndex) }">
            <input type="radio" :value="optionIndex" v-model="selectedOptions[index]" :disabled="submitted">
            {{ option }}
            <span v-if="isSelected(index, optionIndex) && isCorrect(index, optionIndex) && submitted">&#10004;</span>
            <span v-if="isSelected(index, optionIndex) && !isCorrect(index, optionIndex) && submitted">&#10008;</span>
          </label>
        </li>
      </ul>
  </div>
  <button
    @click="checkAnswer"
    :disabled="!allQuestionsAnswered || submitted"
    :class="{ 'disabled': !allQuestionsAnswered || submitted }"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded"
  >
    Check Answers
  </button>
  <button
    @click="resetForm"
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-8 rounded"
  >
    Reset Form
  </button>
  <div v-if="results">
    <p class="font-bold"><span class="text-blue-700">Results</span>: you got {{ correctAnswers }} out of {{ activity.questions.length }} questions correct!</p>
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
    allQuestionsAnswered() {
      return this.selectedOptions.every(option => option !== null);
    }
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

<style>
.correct {
  color: green;
}

.selected {
  font-weight: bold;
}
</style>
