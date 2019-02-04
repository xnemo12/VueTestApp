<template>
  <section>
    <b-loading :active="loading" :can-cancel="false"></b-loading>
    <nav class="panel">
      <div class="panel-block" v-if="uploadable">
        <b-field class="file" >
          <b-upload v-model="file" @input="upload(documentId)">
            <a class="button is-primary">
              <b-icon icon="upload"></b-icon>
              <span>Выберите файл</span>
            </a>
          </b-upload>
          <span class="file-name" v-if="file">
            {{ file.name }}
          </span>
        </b-field>
      </div>

      <draggable v-model="files" @start="drag=true" @end="onDragEnd(documentId, srcAttach, destAttach)" :move="changePosition" >
        <div class="panel-block is-block-fullhd" v-for="f in files" :key="f.position">
          <span class="arrows_icon">
            <b-icon icon="arrow-all"></b-icon>
          </span>
          {{ f.originalName }}

          <a class="arrows_icon is-pulled-right" @click="deleteFile(f, f.id)">
            <b-icon icon="delete"></b-icon>
          </a>

          <a class="arrows_icon is-pulled-right" @click="download(f.id, f.originalName)">
            <b-icon icon="download"></b-icon>
          </a>
        </div>
      </draggable>
    </nav>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import {attachmentResource} from '../http/resources'
export default {
  name: 'UploadSection',
  components: {
    draggable
  },
  props: ['documentId', 'uploadable'],
  data () {
    return {
      files: [],
      file: null,
      loading: false,
      srcAttach: null,
      destAttach: null
    }
  },
  methods: {
    loadData (id) {
      attachmentResource.get({id}).then((response) => {
        this.files = response.body
      }).catch((error) => {
        console.log(error)
      })
    },
    deleteFile (f, id) {

      this.$dialog.confirm({
        message: `Вы действительно хотите удалить? Действие невозможно будет отменить, вы уверены?`,
        cancelText: 'Отменить',
        onConfirm: () => {
          attachmentResource.delete({id}).then(() => {
            this.$toast.open({
              message: 'Файл удален',
              type: 'is-warning'
            })
            this.files.splice(this.files.indexOf(f), 1)
          }).catch(() => {
            this.$toast.open({
              message: 'Файл не найден на сервере',
              type: 'is-danger'
            })
          })
        }
      })
    },
    download (id, name) {
      attachmentResource.download({id}).then((response) => {
        let blob = new Blob([response.data], {type: response.headers.get('content-type')})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = name
        link.click()
      }).catch(() => {
        this.$toast.open({
          message: 'Файл не найден на сервере',
          type: 'is-danger'
        })
      })
    },
    upload (id) {
      this.loading = true
      const uploadFile = new FormData()
      uploadFile.append('attach', this.file)
      attachmentResource.upload({id}, uploadFile).then(() => {
        this.loading = false
        this.loadData(id)
      }).catch(error => console.log(error))
    },
    changePosition (event) {
      this.srcAttach = event.draggedContext.element.id
      this.destAttach = event.relatedContext.element.id
    },
    onDragEnd (id, src, dest) {
      console.log(src + ' - ' + dest)
      attachmentResource.order({src, dest}, {}).then(() => {
        this.loadData(id)
      }).catch(error => console.log(error))
    }
  },
  mounted () {
    this.loadData(this.$props.documentId)
  }
}
</script>

<style scoped>
  .arrows_icon{
    color: #ccc;
    margin-right: 5px;
  }
</style>
