import { Resource } from 'vue-resource'

const documentResource = Resource('', {}, {
  getDocuments: {
    method: 'GET',
    url: 'document'
  },
  getDocument: {
    method: 'GET',
    url: 'document/{id}'
  },
  postDocument: {
    method: 'POST',
    url: 'document'
  },
  updateDocument: {
    method: 'PUT',
    url: 'document/{id}'
  },
  deleteDocument: {
    method: 'DELETE',
    url: 'document/{id}'
  }
})

const attachmentResource = Resource('', {}, {
  get: {
    method: 'GET',
    url: 'attachments/{id}'
  },
  delete: {
    method: 'DELETE',
    url: 'attachment/{id}'
  },
  download: {
    responseType: 'arraybuffer',
    method: 'GET',
    url: 'download/{id}'
  },
  upload: {
    method: 'POST',
    url: 'attachment/{id}'
  },
  order: {
    method: 'POST',
    url: 'attachment/order/{src}/{dest}'
  }
})

export {
  documentResource,
  attachmentResource
}
