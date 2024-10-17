import express from 'express';

const app = express();

app.listen(3001, (req, res) => {
  res.json({
    message: 'app started on port 3001',
  });
});
