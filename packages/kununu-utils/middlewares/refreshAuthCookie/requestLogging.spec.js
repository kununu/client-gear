const express = require('express');
const request = require('supertest');

const requestLogging = require('.');

describe('middlewares', () => {
  describe('requestLogging', () => {
    it('logs a normal request', async () => {
      const app = express();
      app.use(requestLogging());
      app.get('/someroute', (req, res) => {
        res.send();
      });

      const result = await request(app).get('/someroute');
      expect(result.statusCode).toEqual(200);
    });

    it('logs more information for 500 requests', async () => {
      const app = express();
      app.use(requestLogging());
      app.get('/error-route', (req, res) => {
        res.status(500).send();
      });

      const result = await request(app).get('/error-route');
      expect(result.statusCode).toEqual(500);
    });

    it('logs more information for other statuscodes, if they are supplied as options', async () => {
      const app = express();
      app.use(requestLogging({statusCodes: [202]}));
      app.get('/custom-status-code', (req, res) => {
        res.status(202).send();
      });

      const result = await request(app).get('/custom-status-code');
      expect(result.statusCode).toEqual(202);
    });

    it('throws an error, when status codes are supplied, but not as an array', async () => {
      const app = express();
      try {
        app.use(requestLogging({statusCodes: {202: 202}}));
      } catch (err) {
        expect(err).not.toBe(null);
      }
    });
  });
});
