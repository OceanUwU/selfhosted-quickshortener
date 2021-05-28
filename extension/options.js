function save() {
    chrome.storage.sync.set({
        host:  $('#host').val(),
        key: $('#key').val()
    }, function() {
        $('#status').text('Options saved.');
        setTimeout(() => $('#status').text(''), 750);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get(['host', 'key'], options => {
        $('#host').val(options.host);
        $('#key').val(options.key);
        
        $('#save').click(save);
    });
}, false);