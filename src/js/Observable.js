export class Observable {
  constructor () {
    this.observers = [];
  }
  subscribe (obs) {
    this.observers.push(obs)
  }

  notifyAll (context) {
    this.observers.forEach(obs => {
      obs.handler.call(obs.context, context)
    })
  }
}
