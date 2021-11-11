document.addEventListener('DOMContentLoaded', function () {

    const MAX_X = 3;
    const MIN_X = -5;
    const MAX_Y = 3;
    const MIN_Y = -3;


    let dot = document.getElementById("dot");
    let prevPointColor = "black";
    let curPointColor = "black";


    function getXmlHttpReq() {
        let req = null;
        try {

            if (window.XMLHttpRequest) {
                req = new XMLHttpRequest();
            } else {
                if (window.ActiveXObject) {
                    try {
                        req = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (e) {
                        req = new ActiveXObject("Microsoft.XMLHTTP");
                    }
                }
            }

        } catch (ex) {
        }
        return req;
    }


    function sendRequestAndRenewDynamicParts() {
        let req = getXmlHttpReq();

        let x = getX();
        let y = getY();
        let r = getR();
        let svg = document.getElementById("graph-svg");
        let url = 'controller?' + 'x=' + x.toString() +
            '&y=' + y.toString() +
            '&r=' + r.toString() +
            '&graph=' + document.querySelector(".graph_point_info").value +
            '&graphY=' + y.toString() +
            '&table=true';

        req.open("GET", url, true);

        req.setRequestHeader("X-Inc-Counter", r.toString());

        req.addEventListener("readystatechange", () => {
            try {
                if (req.readyState === 4 && req.status === 200) {

                    document.getElementById("table-scroll-container").innerHTML = req.response;
                    let {absoluteX, absoluteY} = getAbsoluteOffsetFromXYCoords(x, y, r);
                    addTableRowEventListeners();
                    redrawDotsAfterRChanged();

                }
            } catch (e) {
                alert("Error occurred: " + e);
            }
        });
        req.send();
    }


    function sendClearHttpRequest() {
        let paramString = 'clear=true';
        let req = getXmlHttpReq();
        let url = 'controller?' + paramString;
        req.open("GET", url, true);

        req.addEventListener("readystatechange", () => {
            try {
                if (req.readyState === 4 && req.status === 200) {

                    document.querySelectorAll("circle").forEach(function (obj) {
                        obj.remove();
                    });
                    document.getElementById("table-scroll-container").innerHTML = "";

                }
            } catch (e) {
                alert("Error occurred: " + e);
            }
        });
        req.send();
    }


    function isNumber(number) {
        return !isNaN(number) && isFinite(number);
    }

    function validateX() {
        let x = getX();
        let input = document.querySelector("#x-input");
        if (isNumber(x) && x >= MIN_X && x <= MAX_X) {
            return true;
        }
        return false;
    }

    function validateY() {

        let graphMode = document.querySelector(".graph_point_info").value;
        let y = parseFloat(document.querySelector("#graph-y").value);
        if (graphMode === "true" && isNumber(y) && y >= MIN_Y && y <= MAX_Y) {
            return true;
        }
        return document.querySelector("input[type='radio']:checked") != null;

    }

    function validateR() {
        let r = getR();
        return isNumber(r);

    }

    function validateData() {
        let valid = validateX() && validateY() && validateR();
        if (!valid) displayMessage("Data is invalid");
        return validateX() && validateY() && validateR();
    }

    function getY() {

        if (document.querySelector("input[type='radio']:checked") != null) {
            return parseFloat(document.querySelector("input[type='radio']:checked").value);
        } else {
            let graphMode = document.querySelector(".graph_point_info").value;
            let y = parseFloat(document.querySelector("#graph-y").value);
            if (graphMode === "true" && isNumber(y)) {
                return y;
            }
        }
        return NaN;
    }

    function getX() {
        let x = document.querySelector("#x-input").value;
        if (typeof x != "undefined") {
            x = x.replace(",", ".");
            if (/^[+-]?[0-9]+\.?[0-9]*$/.test(x)) {
                return parseFloat(x);
            }
        }
        return NaN;

    }

    function getR() {
        return parseFloat(document.querySelector("#r-options").value);
    }

    function drawDot(x, y, r) {
        if (isNumber(x) && isNumber(y) && isNumber(r)) {
            let {absoluteX, absoluteY} = getAbsoluteOffsetFromXYCoords(x, y, r);
            drawDotInAbsoluteCoord(absoluteX, absoluteY);

        } else {
            dot.setAttribute("r", 0);
        }
    }

    function drawDotInAbsoluteCoord(absoluteX, absoluteY) {
        dot.setAttribute("r", 3);
        dot.setAttribute("cx", absoluteX);
        dot.setAttribute("cy", absoluteY);
    }

    function setGraphModeOnForm(x, y) {
        document.querySelector(".graph_point_info").value = "true";
        if (document.querySelector("input[type='radio']:checked") != null) {
            document.querySelector("input[type='radio']:checked").checked = false;
        }
        document.querySelector("#graph-y").value = y;
        document.querySelector("#x-input").value = x;
    }

    function setInputModeOnForm() {
        document.querySelector(".graph_point_info").value = "false";
    }

    function getXYCoordsFromAbsoluteOffset(absoluteXOffset, absoluteYOffset, r) {
        const CENTER_X = 150;
        const CENTER_Y = 120;
        return {
            x: Math.round(((absoluteXOffset - CENTER_X) * r / 100) * 1000) / 1000,
            y: Math.round(((CENTER_Y - absoluteYOffset) * r / 100) * 1000) / 1000
        }
    }

    function getAbsoluteOffsetFromXYCoords(x, y, r) {
        const CENTER_X = 150;
        const CENTER_Y = 120;
        let relativeX = x * 100 / r;
        let relativeY = y * 100 / r;
        return {
            absoluteX: CENTER_X + Math.round(relativeX),
            absoluteY: CENTER_Y - Math.round(relativeY)
        }
    }

    function redrawDotsAfterRChanged() {
        document.querySelectorAll("circle.prev-dot").forEach(e => e.remove());
        let x, y, r, rNew, fill;
        let svg = document.getElementById("graph-svg");
        document.querySelectorAll("#result-table tbody tr").forEach(function (row, index) {
            x = parseFloat(row.cells[0].innerText);
            y = parseFloat(row.cells[1].innerText);
            r = parseFloat(row.cells[2].innerText);
            rNew = getR();
            fill = (r === rNew) ? "#6A00FFCE" : "rgba(59,59,59,0.47)";
            let {absoluteX, absoluteY} = getAbsoluteOffsetFromXYCoords(x, y, rNew);
            svg.insertAdjacentHTML('beforeend', `<circle r="2" cx=${absoluteX} cy=${absoluteY} class="prev-dot" fill=${fill}></circle>`)
        });
    }

    function rowListener() {
        let x = parseFloat(this.cells[0].innerText);
        let y = parseFloat(this.cells[1].innerText);
        let {absoluteX, absoluteY} = getAbsoluteOffsetFromXYCoords(x, y, getR());
        document.querySelectorAll("#graph-svg circle").forEach(function (circle, index) {
            if (parseFloat(circle.getAttribute("cx")) === absoluteX && parseFloat(circle.getAttribute("cy")) === absoluteY) {
                if (circle.getAttribute("fill") !== "#ea0037") curPointColor = circle.getAttribute("fill");
                circle.setAttribute("fill", "#ea0037");
            } else {
                if (circle.getAttribute("fill") === "#ea0037") {
                    circle.setAttribute("fill", prevPointColor);
                    prevPointColor = curPointColor;
                }
            }
        })
        prevPointColor = curPointColor;
    }

    function graphListener(event) {

        if (!validateR()) {
            displayMessage("R is not set, point cannot be drawn");
            return;
        }

        let graph = document.getElementById("graph-svg");
        let boundingRect = graph.getBoundingClientRect();
        let body = document.body;

        let dx = Math.round((event.pageX - (boundingRect.left + body.scrollLeft)) * 100) / 100;
        let dy = Math.round((event.pageY - (boundingRect.top + body.scrollTop)) * 100) / 100;
        let r = getR();
        drawDotInAbsoluteCoord(dx, dy);

        let {x, y} = getXYCoordsFromAbsoluteOffset(dx, dy, r);
        setGraphModeOnForm(x, y);

        if (validateData()) {
            sendRequestAndRenewDynamicParts();
        }
    }


    document.querySelector("button.reset").addEventListener("click", function () {
        document.querySelector(".clear_info").value = "true";
    });

    document.querySelector(".svg-graph").addEventListener("click", graphListener);

    function addTableRowEventListeners() {
        document.querySelectorAll("#result-table tbody tr").forEach(function (row) {
            row.addEventListener("click", rowListener);
        });
    }

    addTableRowEventListeners();

    document.querySelector("#r-options").addEventListener("change", function () {
        drawDot(getX(), getY(), getR());
        redrawDotsAfterRChanged();
    });

    document.querySelector("#x-input").addEventListener("keypress", function (event) {
        let test = /[0-9.,\-+]/.test(event.key);
        if (!test) {
            event.preventDefault();
        }
    });

    document.querySelector("#x-input").addEventListener("input", function () {
        drawDot(getX(), getY(), getR());
    });

    document.querySelector("#yradio").addEventListener("change", function () {
        setInputModeOnForm();
        drawDot(getX(), getY(), getR());
    })

    document.querySelector("button.submit").addEventListener("click", function (event) {
        event.preventDefault();
        if (validateData()) {
            sendRequestAndRenewDynamicParts();
        }
    });

    document.querySelector("button.reset").addEventListener("click", function (event) {
        event.preventDefault();
        sendClearHttpRequest();
    });


});