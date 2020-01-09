// This exists to proxy traffic:
//  * from: localhost:3000/api/airtable/* (served by `next dev`)
//  *   to: localhost:5000/api/airtable/* (served by `firebase serve`)
//
// ...when both:
//  * developing on a local machine (the route is masked by a redirect in Firebase Hosting)
//  * and process.env.airtable.apiBase set to liveAirtableApiBase
//    (to load Airtable data directly from Airtable rather than from the persisted copy).
//
// This route is therefore never invoked when either:
//  * process.env.airtable.apiBase is set to prodAirtableApiBase, or
//  * serving from Firestore Hosting (as the route is masked by a function redirect).
//
// https://nextjs.org/docs/api-routes/introduction

const http = require('http');

export default function AirtableLocalProxy(req, res) {
  const options = {
    host: req.headers.host.split(':')[0],
    path: req.url,
    port: 5000,
  };

  const proxy = http.get(options, result => {
    res.writeHead(result.statusCode, result.statusMessage, result.headers);
    result.pipe(res, {
      end: true,
    });
  });

  req.pipe(proxy, {
    end: true,
  });
}
