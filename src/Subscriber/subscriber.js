class Subscriber {
    constructor() {

    }

    setSubscriber() {
        this.subscriber = new Promise(() => {
            fetch('')
        })
    }

    getSubscriber() {
        this.subscriber.then((res) => {
            console.log('res', res);
        })
    }
}
