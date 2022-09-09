/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest;
    let method = options.method;
    let url;
    let formData;

    if (method === 'GET') {

        if (options.data) {
            let urlOption = Object.entries(options.data)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
            url = `${options.url}?${urlOption}`;
        }

    } else {
        formData = new FormData();
        url = options.url;

        for (let item in options.data) {
            formData.append(item, options.data[item]);
        }
    }

    try {
        xhr.open(options.method, url);
        xhr.responseType = 'json';
        xhr.send(formData);
    }
    catch (e) {
        callback(e);
    }

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === xhr.DONE) {
            options.callback(null, xhr.response);
        } else {
            options.callback(xhr.statustext, null);
        }
    });
};