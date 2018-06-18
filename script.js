const table_header = "<tr><th>Offense</th><th>Fine</th><th>Jail Time</th></tr>";
const categories = ["Traffic Violations", "Criminal Traffic Violations", "Criminal Offenses", "Public Acts"];
$(function() {
    $.ajax({
        dataType: "json",
        url: "offenses.json",
        success: function(charges) {
            printCharges(charges);
        },
        error: function(e) {
            printCharges(e);
        }
    });
});

function printCharges(charges) {
    let text = $("#charges").html();
    for (i = 0; i < categories.length; i++) {
        text += "<h1>" + categories[i] + "</h1><br/>";
        text += "<table>" + table_header;
        for (j = 0; j < charges.length; j++) {
            if (charges[j]["category"]===categories[i]) {
                charge = charges[j];
                text += "<tr id='charge"+j+"''><td>" + charge["offense_name"] + "</td>";
                text += "<td>" + charge["fine_amount"] + "</td>";
                text += "<td>" + charge["jail_amount"] + "</td></tr>";
                $("#charge"+j).on('hover', function() {
                    $("#description").html(charge["description"]);
                });
                console.log(charge);
            }
        }
        text += "</table>";
    }
    $("#charges").html(text);
}
