import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const fDb = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, fDb as default };

/* fDb.ref('singlePerson').set({
    name: 'AAA bbb',
    age: 16,
    isSingle: true,
    wouldBeRemoved: 'This one',
    location: {
        city: 'City0',
        country: 'the US'
    }
})
.then((resp) => {
    console.log('29 -- resp: ', resp.val());
})
.catch((err) => {
    console.log('32 -- err: ', err);
});

fDb.ref('singlePerson/wouldBeRemoved').remove();
fDb.ref('singlePerson/wouldBeRemoved').set(null);

fDb.ref('singlePerson').update({
    job: 'software engineer',
    'location/city': 'City_100'
});

fDb.ref('shouldBeOff').set({
    type: 'type0'
});

const ReadThisOnce = fDb.ref('shouldBeOff').on('value',
    (resp) => {
        console.log('50 -- resp: ', resp.val());
    },
    (err) => {
        console.log('53 -- err: ', err);
    }
);

fDb.ref().off();
fDb.ref('shouldBeOff').off('value', ReadThisOnce);

fDb.ref('notes').push({
    desc: 'id would be gererated by firebase automatically',
    voice: 'hahala',
    body: 'React_Native python rubyOnRail'
});

fDb.ref('notes/-LPSXVhzrsYjKCn7mEy_').update({
    body: 'React_Native python rubyOnRail ASP.NET'
});

fDb.ref('notes/-LPSYy8vYB3M12e5HGMP').remove();

fDb.ref('notes').once('value')
.then((resp) => {
    console.log('75 -- resp: ', resp.val());
    const localNotes = [];
    resp.forEach((elem, idx) => {
        localNotes.push({
            id: elem.key,
            ...elem.val()
        });
    });
    console.log('83 -- notes: ', localNotes);
})
.catch((err) => {
    console.log('86 -- err: ', err);
});


fDb.ref('notes').on('value',
    (resp) => {
        const localNotes = [];
        resp.forEach((elem, idx) => {
            localNotes.push({
                id: elem.key,
                ...elem.val()
            });
        });
        console.log('99 -- notes: ', localNotes);
    },
    (err) => {
        console.log('102 -- err: ', err);
    }
);

fDb.ref('notes').on('child_added',
    (resp, prevKey) => {
        console.log('108 -- child_added: ', resp.val(), prevKey);
    },
    (err) => {
        console.log('111 -- err: ', err);
    }
); */
