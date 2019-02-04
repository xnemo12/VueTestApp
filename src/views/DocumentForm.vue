<template>
  <BaseLayout>
    <h1 class="title is-3">{{ title }}</h1>

    <div class="container columns is-fluid">

      <div class="column">
        <section>
          <form @submit.prevent="doSave">
            <b-field label="Название документа">
              <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Описание документа">
              <b-input type="textarea" v-model="description"></b-input>
            </b-field>

            <b-field>
              <div class="field is-grouped">
                <div class="control">
                  <button type="submit" class="button is-primary">Сохранить</button>
                </div>
                <div class="control">
                  <button class="button is-danger" @click.prevent="toBack">Назад</button>
                </div>
              </div>
            </b-field>
          </form>
        </section>
      </div>
      <div class="column">
        <b-field label="Файлы" v-if="showFiles">
          <UploadSection :documentId="documentId" :uploadable="true"></UploadSection>
        </b-field>
      </div>

    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '../components/BaseLayout'
import {documentResource} from '../http/resources'
import UploadSection from '../components/UploadSection'
export default {
  name: 'DocumentForm',
  components: {UploadSection, BaseLayout},
  data () {
    return {
      name: '',
      description: '',
      title: 'Новый документ',
      showFiles: false
    }
  },
  methods: {
    loadData (id) {
      documentResource.getDocument({id}).then((response) => {
        this.name = response.body.name
        this.description = response.body.description
      }).catch((error) => {
        console.log(error)
      })
    },
    toBack () {
      this.$router.back()
    },
    doSave (id) {
      if (this.documentId == null) {
        documentResource.postDocument({
          name: this.name,
          description: this.description
        }).then((response) => {
          this.$toast.open({
            message: 'Документ сохранен',
            type: 'is-info'
          })
        }).catch((error) => {
          console.log(error)
        })
      } else {
        documentResource.updateDocument({
          id: this.documentId}, {
          name: this.name,
          description: this.description}
        ).then((response) => {
          this.$toast.open({
            message: 'Документ сохранен',
            type: 'is-info'
          })
        }).catch((error) => {
          console.log(error)
        })
      }
      this.toBack()
    }
  },
  computed: {
    documentId () {
      return this.$route.params.id
    }
  },
  mounted () {
    if (this.documentId != null) {
      this.title = 'Редактирование документа'
      this.loadData(this.documentId)
      this.showFiles = true
    }
  }
}
</script>
