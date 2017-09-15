import { Observable } from 'rxjs'

const ObservableSocket = ({ socket, host, port }) => {
    
    socket.connect(port, host)

    const send = data => socket.send(data)

    return {
        send: send,
        messages: () => Observable.fromEvent(socket, 'data', data => data)
    }
}

export default ObservableSocket