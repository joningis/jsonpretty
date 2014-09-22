
//http://stackoverflow.com/questions/1643320/get-month-name-from-date
Date.prototype.getMonthName = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names[this.getMonth()];
};

Date.prototype.getMonthNameShort = function(lang) {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getMonth()];
};

Date.locale = {
    en: {
       month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
       month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
};


//http://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
// For todays date;
Date.prototype.today = function () {
    return ((this.getDate() < 10)?"0":"") + this.getDate() +" "+ this.getMonthNameShort() + " "+ this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

// http://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}


// Inspired by http://jsfiddle.net/tovic/AbpRD/
function addLineNumbers(str) {
        numbers = '<span class="line-number">';
        var num = str.split(/\n/).length;
        for (var j = 0; j < num; j++) {
            numbers += '<span>' + (j + 1) + '</span>';
        }
        numbers += '</span>' + str + '<span class="cl"></span>';
        return numbers;
}

$("#submit").click(function() {
var obj = jQuery.parseJSON(document.getElementById('json').value);
	var str = syntaxHighlight(JSON.stringify(obj, null, 4));

  var datetime = new Date().today() + " @ " + new Date().timeNow();
  var title = $("#title").val();
  $( "#code" ).after("<div class=\"time\">" + title + " (" + datetime + ")</div><pre><code>" + addLineNumbers(str) + "</code></pre>");

});
$("#clear").click(function() {
	$("#json").val('');
    $("#title").val('');
});
