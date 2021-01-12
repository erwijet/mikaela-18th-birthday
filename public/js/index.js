// uses jQuery (code.jquery.com)

let token;

(async () => {
    // get token
    token = globalThis.document.cookie.split('auth=')[1];

    // anticipate future errors b/c soy stupid
    if (!token)
        globalThis.document.location = '/logout';

    await $.ajax({
        method: 'GET',
        url: 'https://api.balena-cloud.com/v5/device_environment_variable?$filter=device%20eq%204108745',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        success: data => {
            const { value } = data.d[1];
            $('#currentMsg').html("Current Message: " + value);
        },
        error: data => {
            // TODO: Remove 
            console.log(data);
        }
    })
})();

// override form functionality
$('#mainForm').on('submit', e => {
    e.preventDefault();
    const msg = $('#inputMsg').val();
    if (msg == '') {
        makeAlert('You can\'t do that, silly!');
        return;
    }

    sendMessage(msg);
});

function makeAlert(txt) {
    alert(txt);

    // TODO: create fancy alert interface?
}

function refresh(... _) {
    globalThis.document.location =
        globalThis.document.location;
}

function sendMessage(msg) {
    if (!token)
        return;

    (async () => {
        await $.ajax({
            type: 'PATCH',
            url: 'https://api.balena-cloud.com/v5/device_environment_variable(618889)',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            data: `{ "value": "${msg}" }`,
            success: refresh
        });
    })();
}