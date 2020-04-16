import { ENDPOINT } from '../constants';

const ws = new WebSocket(`wss://${ENDPOINT}/api/websocket`);

export default ws;
