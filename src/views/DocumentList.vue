<template>
  <BaseLayout>
    <div class="container is-fluid">
      <h1 class="title is-3">Список документов</h1>
      <div class="level">

        <div class="level-left">
          <form @submit.prevent="onSearch">
            <div class="field is-grouped controls">
              <div class="control">
                <b-input v-model="q" placeholder="Искать..."></b-input>
              </div>
              <div class="control">
                <button type="submit" class="button is-primary">
                  Поиск
                </button>
              </div>
            </div>
          </form>
        </div>

        <div class="level-right">
          <div class="field is-grouped controls">
            <div class="control">
              <button class="button is-success" @click="addDocumentForm">Добавить</button>
            </div>
            <div class="control">
              <!--<button class="button is-danger"-->
                      <!--@click="deleteSelection"-->
                      <!--:disabled="!checkedRowsCount > 0">Удалить-->
              <!--</button>-->
            </div>
          </div>
        </div>
      </div>

      <b-table class="box"
        :data="data"
        :loading="loading"
        :total="total"
        :per-page="perPage"
        mobile-cards
        hoverable
        default-sort="name"
        paginated
        backend-pagination
        checkable
        @page-change="onPageChange">

        <template slot-scope="props">
          <b-table-column field="first_name" label="Название" sortable >
            {{ props.row.name }}
          </b-table-column>

          <b-table-column field="date" label="Дата создания" sortable centered>
                    <span class="tag is-success">
                        {{ new Date(props.row.created).toLocaleDateString() }}
                    </span>
          </b-table-column>

          <b-table-column label="Actions" numeric>
            <button class="button is-light" @click="editDocumentForm(props.row.id)">
              <b-icon icon="square-edit-outline"></b-icon>
              <span>Ред.</span>
            </button>
            <button class="button is-light" @click="showDocumentForm(props.row.id)">
              <b-icon icon="eye"></b-icon>
              <span>Просм.</span>
            </button>
          </b-table-column>

        </template>

        <template slot="empty">
          <section class="section">
            <div class="content is-fluid has-text-grey has-text-centered">
              <p>Ничего не найдено</p>
            </div>
          </section>
        </template>

      </b-table>
    </div>
  </BaseLayout>
</template>

<script>
import BaseLayout from '../components/BaseLayout'
// import {mapState} from 'vuex'
import {documentResource} from '../http/resources'
export default {
  name: 'DocumentList',
  components: {BaseLayout},
  data () {
    return {
      data: [],
      total: 0,
      loading: false,
      page: 1,
      perPage: 7,
      q: ''
    }
  },
  methods: {
    loadData () {
      this.loading = true
      documentResource.getDocuments({
        page: this.page,
        perPage: this.perPage,
        q: this.q
      }).then((response) => {
        this.loading = false
        this.total = response.body.count
        this.data = response.body.data
      }).catch((error) => {
        console.log(error)
      })
    },

    onPageChange (page) {
      this.page = page
      this.loadData()
    },

    addDocumentForm () {
      this.$router.push({name: 'DocumentNewForm'})
    },

    editDocumentForm (id) {
      this.$router.push({name: 'DocumentEditForm', params: {'id': id}})
    },

    showDocumentForm (id) {
      this.$router.push({name: 'DocumentView', params: {'id': id}})
    },

    onSearch () {
      this.loadData()
    },

    deleteSelection () {
      alert('DELETE')
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
