<template>
  <BaseLayout>
    <h1 class="title is-3">Просмотр документа</h1>
    <div class="container is-fluid">
      <div class="columns">
        <div class="column">
          <b-field label="Документы"></b-field>
          <div class="box">
            <article class="media">
              <div class="media-content">
                <div class="content">
                  <h3>{{ document.name }}</h3>
                  <small class="tag is-success">{{ new Date(document.created).toLocaleDateString() }}</small>
                  <p>{{ document.description }}</p>
                </div>
              </div>
            </article>
          </div>
          <button class="button is-danger" @click.prevent="toBack">Назад</button>
        </div>
        <div class="column">
          <b-field label="Файлы" v-if="showFiles">
            <UploadSection :documentId="documentId" :uploadable="false"></UploadSection>
          </b-field>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '../components/BaseLayout'
import UploadSection from '../components/UploadSection'
import {documentResource} from '../http/resources'

export default {
  name: 'DocumentEdit',
  components: {BaseLayout, UploadSection},
  data () {
    return {
      document: [],
      showFiles: true
    }
  },
  methods: {
    loadData (id) {
      documentResource.getDocument({id}).then((response) => {
        this.document = response.body
      }).catch((error) => {
        console.log(error)
      })
    },
    toBack () {
      this.$router.back()
    }
  },
  mounted () {
    this.loadData(this.documentId)
  },
  computed: {
    documentId () {
      return this.$route.params.id
    }
  }
}
</script>
