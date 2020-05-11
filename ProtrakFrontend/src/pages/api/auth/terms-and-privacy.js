const https = require('https');

export default (req, res) => {
  const filename = req.query.file === 'privacy' ? 'Privacy' : 'Terms';

  https.get(
    `https://protrak-front-end.s3.amazonaws.com/dev/pdf/${filename}.pdf`,
    response => {
      res.statusCode = 200;

      if (req.query.download) {
        res.setHeader('Content-Type', 'application/download');
        res.setHeader('Content-disposition', `attachment; filename=${filename}.pdf`);
      }

      response.pipe(res);
    },
  );
};
