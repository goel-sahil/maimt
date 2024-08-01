const accountSid = '';
const authToken = '';
const client = require('twilio')(accountSid, authToken);

async function main() {
    await client.messages
        .create({
            body: 'Hello',
            from: '+17072825262',
            to: '+918053225326'
        })

}

main().then().catch(error => {
    console.log(error);
})