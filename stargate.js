var current = 1,
    chevrons = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

var addresses = {
    earth: [28, 26, 4, 36, 11, 29],
    abydos: [27, 7, 15, 32, 12, 30],
    chulak: [9, 2, 23, 15, 37, 20]
}
var origin = {
    earth: [1],
    abydos: [5],
    chulak: [7]
}

function rotateTo(symbol, complete) {
    var rotation = (symbol - 1) * 9.23,
        gateTrack = $("#track"),
        diff = Math.abs(current - symbol);

       current = symbol;

    gateTrack.animate({textIndent: rotation}, {
        step: function(now,fx) {
          $(this).css('-webkit-transform','rotate(-'+now+'deg)'); 
        },
        duration: 500 * diff,
        complete: complete
    },'swing');
}

function dial(address, n) {
    if (n === undefined) n = -1;

    var symbol = address.shift();
    if (address.length > 0) rotateTo(symbol, function() {lock(n+1, function () {dial(address, n + 1)})});
    else  rotateTo(symbol, function() {lock(n+1, function () {})});
}

function lock(n, callback) {
    $(".chevron.seven .innerchevron").removeClass("chevronlock");
    setTimeout(function () {
        $(".chevron.seven .innerchevron").addClass("chevronlock");
        setTimeout(function () {
            $(".chevron." + chevrons[n] + " .innerchevron").addClass("locked");
            callback();
        }, 510);
    }, 10);
}

function addressFrom(a, s) {
    return addresses[a].concat(origin[s]);
}
