import * as $ from 'jquery';
import HttpClient from "../_helpers/HttpClient";
let form = document.forms[0];
let fd = new FormData(form);

HttpClient.getInstance({
    url: 'http://localhost:8480/',
    body: fd,
    method: 'post'
})
    .run()
    .then(dt => console.log(dt))
;
