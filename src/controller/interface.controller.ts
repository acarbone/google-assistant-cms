'use strict';

import express from 'express';

export default interface ControllerInterface {
  router: express.Router;
  setWss(wss: any): void;
};
