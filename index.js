'use strict';
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  port: 3000
});

server.method('m1',function(request, reply) {
  return reply('Heeloo world');
});

const pre2 = function(request, reply) {
  return reply(' from hapi');
};
const pre3 = function(request, reply) {
  return reply(request.pre.m1 + request.pre.m2);
};

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    //here i can change what to show//describe cases 
    return reply(request.pre.m3);
  },
  config: {
    pre: [
      [{
        method: 'm1'
      },{
        method: pre2,
        assign: 'm2'
      }], {
        method: pre3,
        assign: 'm3'
      }
    ]
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('server is running at ', server.info.uri);
});
