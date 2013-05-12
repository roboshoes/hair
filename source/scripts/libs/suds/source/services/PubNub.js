define( [

	"libs/pubnub/socketio",
	"suds/events/Dispatcher"

], function( socketio, Dispatcher ) {

	var PubNub = Dispatcher.extend( {

		user: null,
		config: null,

		socket: null,

		isConnected: false,
		userCount: 0,

		initialize: function( autoConnect, config, user ) {
			this._super();

			// If no user is set, generate username
			this.user = user || {
				name: 'user' + Math.floor(Math.random() * 100)
			};

			// Default configurations
			this.config = config || {
				channel : 'project-name',
				publish_key : 'pub-3098c3fd-2ecf-4082-8a37-95c6ed902996',
				subscribe_key : 'sub-99cd7497-264f-11e2-ade3-638b3a7d8bbb',
				origin : 'pubsub.pubnub.com',
				presence: true,
				geo: false
			};

			if (autoConnect) {
				this.connect();
			}
		},

		connect: function() {
			this.socket = io.connect( 'http://pubsub.pubnub.com',  this.config);
			this.addListeners();
		},

		addListeners: function() {
			this.socket.on( 'connect', this.onConnect.bind(this) );
			this.socket.on( 'disconnect', this.onDisconnect.bind(this) );
			this.socket.on( 'reconnect', this.onReconnect.bind(this) );
			this.socket.on( 'message', this.onMessage.bind(this) );
			this.socket.on( 'join', this.onJoin.bind(this) );
			this.socket.on( 'leave', this.onLeave.bind(this) );
		},

		/* Public Methods */

		sendMessage: function(message) {
			if (this.socket && this.isConnected) {
				this.socket.send({message:message, user:this.user.name});
				return;
			}
			console.log('sendMessage failed');
		},

		getUserCount: function() {
			if (this.socket && this.isConnected) {
				return this.socket.get_user_count();
			}
			console.log('getUserCount failed');
			return -1;
		},

		/* Event Listeners */

		onConnect: function() {
			this.isConnected = true;
			this.dispatch(PubNub.CONNECTED);
		},

		onDisconnect: function() {
			this.isConnected = false;
			this.dispatch(PubNub.CONNECTED);
		},

		onReconnect: function() {
			this.isConnected = true;
			this.dispatch(PubNub.CONNECTED);
		},

		onMessage: function(message) {
			this.dispatch(PubNub.MESSAGE_RECEIVED, message);
		},

		onJoin: function(user) {
			this.dispatch(PubNub.USER_COUNT_CHANGED, this.socket.get_user_count());
		},

		onLeave: function(user) {
			this.dispatch(PubNub.USER_COUNT_CHANGED, this.socket.get_user_count());
		}
	});

	PubNub.CONNECTED = 'PubNub.CONNECTED';
	PubNub.DISCONNECTED = 'PubNub.DISCONNECTED';
	PubNub.MESSAGE_RECEIVED = 'PubNub.MESSAGE_RECEIVED';
	PubNub.USER_COUNT_CHANGED = 'PubNub.DISCONNECTED';

	return PubNub;

} )