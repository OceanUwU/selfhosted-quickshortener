function generate() {
    chrome.storage.sync.get(['host', 'key'], options => {
        $('#link').val('Generating link...');
        $.post(`${options.host}api/create`, {
            k: options.key,
            f: $('#source').val(),
            t: $('#destination').val(),
        }, data => {
            if (data === false) {
                alert('Invalid key specified in options!');
            } else {
                $('#link').val(data);
                $('#link')[0].select();
                document.execCommand('copy');
                $('#success').text('Copied to clipboard!');
            }
        }).fail(() => alert('Could not connect to host specified in options.'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['host'], options => {
        $('#host').text(options.host);
    });

    chrome.tabs.getSelected(null, tab => {
        $('#source').val('generateRandomLink');
        $('#destination').val(tab.url);
        generate();

        $('#generate').click(generate);
    });
}, false);