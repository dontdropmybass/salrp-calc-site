$(function() {
    let categories = $.getJSON("offense-categories.json");
    let charges = $.getJSON("offenses.json");

    const table_header = "<tr><th>Offense</th><th>Fine</th><th>Jail Time</th></tr>";
    let text = $("#charges").html();
    for (i = 0; i < categories.length; i++) {
        text += "<h1>" + categories[i] + "</h1><br/>";
        text += "<table>" + table_header;
        for (j = 0; j < charges.length; j++) {
            if (charges[j]["category"]===categories[i]) {
                charge = charges[j];
                text += "<tr id='charge"+j+"''><td>" + charge["offense"] + "</td>";
                text += "<td>" + charge["fine_amount"] + "</td>";
                text += "<td>" + charge["jail_time"] + "</td></tr>";
                $("#charge"+j).onhover(function() {
                    $("#description").html(charge["description"]);
                });
                console.log(charge);
            }
        }
        text += "</table>";
    }
    $("#charges").html(text);
});