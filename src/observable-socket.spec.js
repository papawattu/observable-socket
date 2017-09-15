import chai from 'chai';
import sinon from 'sinon';
import ObservableSocket from './observable-socket';
import EventEmitter from 'events'

const assert = chai.assert;

describe('Observable socket wrapper', () => {

    it('Should bootstrap', () => {
        const socket = {}
        socket.connect = sinon.stub()
        
        const sut = ObservableSocket({ socket, host: '127.0.0.1', port: 8080 })
        assert.isObject(sut)
    })
    it('Should return a send method', () => {
        const socket = {}
        socket.connect = sinon.stub()
        
        const { send } = ObservableSocket({ socket, host: '127.0.0.1', port: 8080 })
        assert.isFunction(send)
    })
    it('Should return a messages method', () => {
        const socket = {}
        socket.connect = sinon.stub()
        
        const { messages } = ObservableSocket({ socket, host: '127.0.0.1', port: 8080 })
        assert.isFunction(messages)
    })
    it('Should connect to host', () => {
        const socket = {}
        socket.connect = sinon.stub()

        ObservableSocket({ socket, host: '127.0.0.1', port: 8080 })
        
        assert(socket.connect.withArgs(8080,'127.0.0.1').calledOnce,'Expected socket.connect to be called with port 8080 and host 127.0.0.1')
    })
    it('Should send to host', () => {
        const socket = {}
        socket.send = sinon.stub()
        socket.connect = sinon.stub()
                
        ObservableSocket({ socket, host: '127.0.0.1', port: 8080 })
            .send('some data')

        assert(socket.send.withArgs('some data').calledOnce,'Expected socket.send to be called with "some data"')
    })
    it('Should get data from host', done => {
        const socket = new EventEmitter()
        socket.send = sinon.stub()
        socket.connect = sinon.stub()
        
        ObservableSocket({ socket, host: '127.0.0.1', port: 8080 })
            .messages()
                .subscribe(data => {
                    assert.equal(data, 'some more data')
                    done()
                })
        socket.emit('data','some more data')
    })
})
