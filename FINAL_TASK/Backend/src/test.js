const jwt = require('jsonwebtoken');

// Replace 'token' with the JWT token you want to decode
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NjQwYjM4ZDkzOTk2NjU2YjNjNDc1OGYiLCJzY29wZSI6WyJ1c2VyIl0sIm5hbWUiOiJWYXJzaGluaSIsImlhdCI6MTcxNTU2OTU5OCwiZXhwIjoxNzE1NTczMTk4fQ.JTX4Z-iFmbKeu5HRh7MP0GVWBpbou_spaa2TjvZNMQM';

const decoded = jwt.decode(token);
console.log(decoded);