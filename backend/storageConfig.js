const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'your-project-id',
  keyFilename: 'path/to/your/service-account-key.json'
});

const bucket = storage.bucket('padi-care');

module.exports = { storage, bucket };

