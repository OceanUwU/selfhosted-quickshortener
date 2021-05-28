function generate() {
    chrome.storage.sync.get(['host', 'key'], options => {
        $('#link').val('Generating link...');
        $.post(`${options.host}/api/create`, {
            k: options.key,
            f: $('#source').val(),
            t: $('#destination').val(),
        }, data => {
            if (data === false) {
                alert('Invalid key specified in options!');
            } else {
                $('#link').val(`${options.host}/${data}`);
                $('#link')[0].select();
                if (document.execCommand('copy')) {
                    $('#success').text('Copied to clipboard!');
                } else {
                    let button = $('<button class="btn btn btn-primary">Copy</button>');
                    button.click(() => {
                        $('#link')[0].select();
                        if (document.execCommand('copy')) {
                            $('#success').text('Copied to clipboard!');
                        } else {
                            $('#success').text('Could not copy.');
                        }
                    });
                    $('#success').append(button);
                }
            }
        }).fail(() => alert('Could not connect to host specified in options.'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['host'], options => {
        $('#host').text(options.host);
    });

    let shortenCurrentTab = tab => { //firefox: 
        $('#source').val('generateRandomLink');
        $('#destination').val(tab.url);
        generate();

        $('#generate').click(generate);
    }

    if (chrome.tabs && chrome.tabs.getSelected) chrome.tabs.getSelected(null, shortenCurrentTab); //run shortenCurrentTab (chrome)
    else browser.tabs.query({active: true, windowId: browser.windows.WINDOW_ID_CURRENT}).then(tabs => browser.tabs.get(tabs[0].id)).then(shortenCurrentTab); //run shortenCurrentTab (firefox)
}, false);