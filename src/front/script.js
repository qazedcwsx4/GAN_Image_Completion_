window.onload = function () {
    init();
    process();
};
const size = 256;
const img = new Image();
img.crossOrigin = "anonymous";
const returnImage = new Image();
returnImage.crossOrigin = "anonymous";
const canvasIn = document.getElementById('inCanvas');
const canvasOut = document.getElementById('outCanvas');
const filePicker = document.getElementById('filePicker');
const sendButton = document.getElementById('sendButton');
let first = true;
let mouseX, mouseY;
let mouseLMB = false;

function init() {
    console.log("Xd");

    img.src = "images.jpg";
    let ctx = canvasIn.getContext('2d');
    ctx.fillStyle = "#7F7F7F";
    img.onload = function () {
        let y = img.height;
        let x = img.width;
        ctx.drawImage(img, (x - y) / 2, 0, y, y, 0, 0, size, size);
    };
    let ctxOut = canvasOut.getContext('2d');
    returnImage.onload = function () {

        //ctxOut.clearRect(0,0,size,size);
        ctxOut.clearRect(0, 0, size, size);

        ctxOut.drawImage(returnImage, 0, 0, size, size);
    };
}

function process() {
    let initX, initY;

    function canvasClick() {
        filePicker.click();
    }

    function mouseDown() {
        mouseLMB = true;
        initX = mouseX;
        initY = mouseY;
    }

    function mouseUp() {
        if (mouseLMB) {
            mouseLMB = false;
            //canvasIn.getContext('2d').clearRect(initX, initY, mouseX - initX, mouseY - initY);
            canvasIn.getContext('2d').fillRect(initX, initY, mouseX - initX, mouseY - initY);
        }
    }

    function sendRequest() {
        let xhr = new XMLHttpRequest();
        //xhr.open("POST", "http://api.imagecompletion.qaze.org");
        xhr.open("POST", "http://localhost:1337");
        let formData = new FormData();
        let imgData = canvasIn.toDataURL("image/png");
        imgData = imgData.replace(/^data:image\/(png|jpg);base64,/, "");
        formData.append('file', imgData);
        xhr.send(formData);


        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                returnImage.src = 'data:image/png;base64,' + xhr.response;
                //console.log(xhr.response);
            }
        }
    }

    function filePicked() {
        if (first) {
            canvasIn.removeEventListener("click", canvasClick);
            canvasIn.addEventListener("mousedown", mouseDown);
            canvasIn.addEventListener("mouseup", mouseUp);
            canvasIn.addEventListener("mousemove", mouseMove);
            sendButton.addEventListener("click", sendRequest);
            first = false;
        }
        let file = filePicker.files[0]; // FileList object
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            img.src = reader.result;
        }
    }

    function mouseMove(e) {
        let rect = canvasIn.getBoundingClientRect();
        //console.log(Math.round(e.clientX - rect.left));
        //console.log(Math.round(e.clientY - rect.top));
        mouseX = Math.round(e.clientX - rect.left);
        mouseY = Math.round(e.clientY - rect.top);
    }

    canvasIn.addEventListener("click", canvasClick);
    filePicker.addEventListener('change', filePicked);

}